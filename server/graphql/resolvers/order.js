const db = require("../../models/index");
const mongoose = require("mongoose");

module.exports = {
    orderCreate: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;

        const expireDate = new Date().getTime() + input.validationDays *24*60*60*1000;

        return await db["Order"].create({
            productId: input.productId,
            expireDate,
            userId: creator,
        });
    },

    orderCreateFromCart: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const products = [];
        const order_amount_payment = [];
        let order_amount = 0;
        const errors = [];

        // read user cart
        const user = await db["User"].findById(creator);
        const cart = user.cart;
        if (cart && cart.items && cart.items[0]) {
            for(let uc of cart.items) {
                const [inputProduct] = input.product_items.filter((ip) => {
                    return ip.id.toString() === uc.productId.toString()
                })
                const product = await db["Product"]
                    .findById(uc.productId)
                    .populate("categoryId userId")
                    .exec();
                if (product.amount >= uc.quantity) {
                    products.push({
                        product: product,
                        quantity: uc.quantity,
                    });
                    let newAmount = uc.quantity * product.price;
                    order_amount += newAmount;
                    const updateIndex = order_amount_payment.findIndex((oap) => {
                        return oap.userId.toString() === product.userId.toString()
                    })
                    if (updateIndex > 0) {
                        order_amount_payment[updateIndex].amount += newAmount
                    } else {
                        order_amount_payment.push({
                            userId: product.userId,
                            amount: newAmount,
                        })
                    }
                } else {
                    errors.push({
                        message: "product amount is not enough",
                        productId: product.id,
                    });
                }
            }
        }
        if (!products[0]) {
            errors.push({
                message: "there is no products",
            });
        };

        // if we have errors
        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        };

        // update product amount
        products.forEach(async (p) => {
            await db["Product"].findByIdAndUpdate(p.product.id, {
                amount: p.product.amount--
            });
        })
        const order = await db["Order"].create({
            products: products,
            order_amount: order_amount,
            order_amount_payment: order_amount_payment,
            userId: creator,
        });

        await db["User"].findByIdAndUpdate(creator, {
            orders: {
                $push: {
                    orderId: order.id
                }
            },
        });

        return order;
    },

    orderUpdate: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const orderId = input.orderId;

        // check creator
        return await db["Order"].findOneAndUpdate({
            _id: orderId,
            userId: creator,
        }, input, { new: true });
    },

    orderFind: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;
        const id = query.id;

        return await db["Order"].findOne({
            _id: id,
            userId: creator,
        }).populate("userId").exec();
    },

    orderFindAll: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;
        const pagination = query.pagination
            ? query.pagination
            : { offset: 0, limit: 10 };

        const orders = await db["Order"]
            .find({})
            .skip(pagination.offset)
            .limit(pagination.limit)
            .populate("userId productId")
            .exec();
        const total = await db["Order"]
            .find({})
            .count();
        
        return {
            hits: orders,
            pagination: {
                ...pagination,
                total: total,
            },
        };
    },

    orderFindUserOrders: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;
        const pagination = query.pagination
            ? query.pagination
            : { offset: 0, limit: 10 };
        const params = { userId: creator };
        query.order_status ? (params.order_status = query.order_status) : null;

        const orders = await db["Order"]
            .find(params)
            .skip(pagination.offset)
            .limit(pagination.limit)
            .populate("categoryId userId payment")
            .exec();
        const total = await db["Order"]
            .find(params)
            .count();
        
        return {
            hits: orders,
            pagination: {
                ...pagination,
                total: total,
            },
        };
    },

    orderFindUserOrdersCounts: async (args, req) => {
        const creator = req.creator;
        
        const orders = await db["Order"]
            .find({ userId: creator });
        const total = await db["Order"]
            .find({ userId: creator })
            .count();

        let waitingToPay = 0,
            payed = 0,
            sent = 0,
            finished = 0,
            rejected = 0,
            payedBack = 0;
        orders.forEach((o) => {
            switch (o.order_status) {
                case "waitingToPay":
                    waitingToPay += 1;
                    break;
                case "payed":
                    payed += 1;
                    break;
                case "sent":
                    sent += 1;
                    break;
                case "finished":
                    finished += 1;
                    break;
                case "rejected":
                    rejected += 1;
                    break;
                case "payedBack":
                    payedBack += 1;
                    break;
            }
        });
        return {
            waitingToPay: waitingToPay,
            payed: payed,
            sent: sent,
            finished: finished,
            rejected: rejected,
            payedBack: payedBack,
            total: total,
        };
    },

    orderFindShopOrders: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;
        const pagination = query.pagination
            ? query.pagination
            : { offset: 0, limit: 10 };

        // check if statuses wanted or not
        const params = { 'products.product.userId': mongoose.Types.ObjectId(creator), };
        query.order_status ? (
            params.order_status = query.order_status
        ): null;

        if (query.shop_order_status) {
            if(
                query.shop_order_status === "waitingToSend" ||
                query.shop_order_status === "todayWaitingToSend"
            ) {
                query.shop_order_status = "payed"
            }
            params.order_status = query.shop_order_status;
        };

        const ordersData = await db["Order"]
            .find(params).populate("userId transactionId")
        const total = await db["Order"].find(params).count();

        // select products of user only and caculate new price again
        let orders = [];
        for(let osd of ordersData) {
            osd._doc.id = osd._id
            let shop_amount = 0;
            osd.products = osd.products.filter(async (op) => {
                if (op.product.userId.toString() === creator.toString()) {
                    shop_amount = op.product.price * op.quantity;
                };
                return op.product.userId.toString() === creator.toString();
            });
            orders.push({
                ...osd._doc,
                shop_amount: shop_amount,
            });
        }

        return {
            hits: orders,
            pagination: {
                ...pagination,
                total: total,
            },
        };
    },

    orderFindShopOrdersCount: async (args, req) => {
        const creator = req.creator;

        const orders = await db["Order"].find({
            'products.product.userId': mongoose.Types.ObjectId(creator),
        });
        const total = await db["Order"].find({
            'products.product.userId': mongoose.Types.ObjectId(creator),
        }).count();

        let waitingToSend = 0,
            todayWaitingToSend = 0,
            sent = 0,
            finished = 0,
            rejected = 0,
            payedBack = 0;
        orders.forEach((o) => {
            switch (o.order_status) {
                case "payed":
                    waitingToSend += 1;
                    // if (o.createdAt > Date.now()) {}
                    todayWaitingToSend += 1;
                    break;
                case "sent":
                    sent += 1;
                    break;
                case "finished":
                    finished += 1;
                    break;
                case "rejected":
                    rejected += 1;
                    break;
                case "payedBack":
                    payedBack += 1;
                    break;
            }
        });
        return {
            waitingToSend: waitingToSend,
            todayWaitingToSend: todayWaitingToSend,
            sent: sent,
            finished: finished,
            rejected: rejected,
            payedBack: payedBack,
            total: total,
        };
    },

    orderFindShopSellsCount: async (args, req) => {
        const creator = req.creator;

        const orders = await db["Order"].aggregate([
            {
                $match: {
                    'products.product.userId': mongoose.Types.ObjectId(creator),
                    order_status: { $in: ["payed", "sent", "finished"] },
                }
            },
            { $group: { _id: null, totalSells: { $sum: 1 }, } }
        ]);
        const totalProducts = await db["Product"].find({
            userId: mongoose.Types.ObjectId(creator),
        }).count();
        
        const totalSells = orders[0] && orders[0].totalSells ? orders[0].totalSells: 0;
        return {
            totalSells: totalSells,
            totalProducts: totalProducts,
        };
    },

    orderFindShopPaysCount: async (args, req) => {
        const creator = req.creator;

        const orders = await db["Order"].find({
            'products.product.userId': mongoose.Types.ObjectId(creator),
            order_status: { $in: ["payed", "sent", "finished"] },
        }).populate("paymentId").exec();

        let totalSell = 0;
        let totalPay = 0;

        if (orders && orders[0]) {
            await orders.forEach((os) => {
                os.order_amount_payment.forEach((oap) => {
                    if (oap.userId.toString() === creator.toString()) {
                        totalSell += oap.amount;
                    }
                })
            })
        }

        const user = await db["User"].findById(creator)
            .populate("shop_payed_orders.orderId");

        if (user && user.shop_payed_orders && user.shop_payed_orders[0]) {
            user.shop_payed_orders.forEach((uspo) => {
                totalPay += uspo.payed_amount;
            })
        }

        return {
            totalSell: totalSell,
            totalPay: totalPay,
        };
    },

    orderShopSellData: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;
        const duration = query.duration
            ? +query.duration
            : 1;
        query.endDate = new Date().setDate(new Date().getDay() + 1000 * 30)

        const orders = await db["Order"].find({
            'products.product.userId': mongoose.Types.ObjectId(creator),
            order_status: { $in: ["payed", "sent", "finished", "rejected", "payedBack"] },
        });

        let data = [];
        let dataSet = [];
        orders.forEach((os) => {
            let quantity = 0;
            os.products.forEach((op) => {
                if (op.product.userId.toString() === creator.toString()) {
                    quantity += op.quantity
                }
            })
            data.push({
                data: os.updatedAt,
                status: os.order_status,
            });
            dataSet.push(quantity.toString());
        })
        
        return {
            data: data,
            dataSet: dataSet,
        };
    },

    orderShopPayWaitings: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;
        const pagination = query.pagination
            ? query.pagination
            : { offset: 0, limit: 10 };

        const user = await db["User"].findOne({
            _id: mongoose.Types.ObjectId(creator),
            status_auth: "active",
        });

        const orders = await db["Order"]
            .find({
                'order_amount_payment.userId': user.id,
                'order_amount_payment.payment_status': {
                    $in: ["waiting", "requested"]
                },
                order_status: { $in: ["payed", "sent", "finished"] },
            })
            .populate("userId paymentId orderId transactionId")
            .skip(pagination.offset)
            .limit(pagination.limit);

        const total = await db["Order"]
            .find({
                'order_amount_payment.userId': user.id,
                'order_amount_payment.payment_status': {
                    $in: ["waiting", "requested"]
                },
                order_status: { $in: ["payed", "sent", "finished"] },
            })
            .count();

        return {
            hits: orders,
            pagination: {
                ...pagination,
                total: total,
            },
        };
    },
};
