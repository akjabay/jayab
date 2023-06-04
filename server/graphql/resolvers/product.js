const mongoose = require("mongoose");
const db = require("../../models/index");
const { nanoid } = require("nanoid");
const { decrypt } = require("../../middlewares/encryption");


const pros = [...Array(100)].map((_, i) => {
    if (i % 2 === 0) {
        return {
            "pid": nanoid(11),
            "name": "اجاره مسکونی 1",
            "latlng": `${37.253952038634914 + i},${55.16884446144104 + i}`,
            "shape": {
                "type": "Point",
                "coordinates": [
                    37.253952038634914 + i,
                    55.16884446144104 + i
                ]
            },
            "address": "آدرس اجاره مسکونی",
            "area": "220",
            "areaOfBuilding": "120",
            "pricePerMeter": "3000000",
            "rooms": 2,
            "details": "جزئیات اجاره مسکونی",
            "ownerInfo": "مالک اجاره مسکونی",
            "thumbnail": "image-1683615471973hrEWE3a.png",
            "images": [
                {
                    "url": "image-1683615471973hrEWE3a.png",
                }
            ],
            "orderIds": [],
            "categoryId": "643bb275a8b577357fa99d0c",
            "userId": "6429d5a2c4025bfa3a780645",
        }
    } else {
        return {
            "pid": nanoid(11),
            "name": "فروش مسکونی",
            "latlng": `${37.011274363578785 + i},${54.45794105529786 + i}`,
            "shape": {
                "type": "Point",
                "coordinates": [
                    37.011274363578785 + i,
                    54.45794105529786 + i
                ]
            },
            "address": "فروش مسکونی",
            "area": "300",
            "areaOfBuilding": "200",
            "pricePerMeter": "2000000",
            "rooms": 2,
            "details": "فروش مسکونی",
            "ownerInfo": "فروش مسکونی",
            "thumbnail": "image-16836512795439VCVHDr.png",
            "images": [
                {
                    "url": "image-16836512795439VCVHDr.png",
                }
            ],
            "orderIds": [],
            "categoryId": "643bb275a8b577357fa99d0d",
            "userId": "645a4c234be7e5628aa21e93",
        }
    }
})

// console.log(pros)

// db["Product"].insertMany(pros).then(() => {
//     console.log('saved')
//   }).catch(() => console.log)

module.exports = {
    productCreate: async (args, req) => {
        const creator = req.creator;
        const user = req.session.user;
        const input = args.input ? args.input : args;

        const images = input.imageUrls
            ? input.imageUrls.split(',').map((iu) => { return { url: iu } }) : [];

        const coordinates = input.latlng.split(',').map((c) => +c);
        const product = await db["Product"].create({
            pid: nanoid(11),
            images,
            thumbnail: images && images[0] ? images[0].url : undefined,
            userId: creator,
            shape: {
                type: "Point",
                coordinates,
            },
            ...input,
        });

        await db["User"].findByIdAndUpdate(creator, {
            $push: {
                productIds: product.id
            },
        });

        if (input.categoryId) {
            await db["Category"].findByIdAndUpdate(input.categoryId, {
                $push: {
                    productIds: product.id
                },
            });
        }


        return product;
    },

    productUpdate: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const params = input.id ? { _id: input.id } : { pid: input.pid };

        const images = input.imageUrls
            ? input.imageUrls.split(',').map((iu) => { return { url: iu } }) : [];

        console.log(input, 'input')

        return await db["Product"].findOneAndUpdate(
            { ...params, userId: creator },
            { ...input, images, thumbnail: images && images[0] ? images[0].url : undefined },
            { new: true }
        );
    },

    productDelete: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const params = input.id ? { _id: input.id } : { pid: input.pid };

        return await db["Product"].findOneAndDelete(
            { ...params }
        );
    },

    productFind: async (args, req) => {
        const creator = req.creator;
        const user = req.session.user;
        const query = args.query ? args.query : args;
        const params = query.id ? { _id: query.id } : { pid: query.pid };

        const product = await db["Product"]
            .findOne(params)
            .populate("categoryId userId")
            .exec();

        if (product) {
            if ((user && user.is_superuser !== 1) && product.userId.id !== creator) {
                product.ownerInfo = '';
            }
            product.userId.phone ? product.userId.phone = decrypt(product.userId.phone) : '';
            
            return product;
        } else {
            return null;
        }
    },

    productFindAll: async (args, req) => {
        const user = req.session.user;
        const query = args.query ? args.query : args;
        const pagination = query.pagination
            ? query.pagination
            : (!query.isMap
                ? { offset: 0, limit: 10 }
                : { offset: undefined, limit: undefined }
            );
        const matchParams = {};
        query.categoryId
            ? matchParams.categoryId = new mongoose.Types.ObjectId(query.categoryId)
            : '';

        query.area ? matchParams.area = query.area : '';
        query.pricePerMeter ? matchParams.pricePerMeter = query.pricePerMeter : '';
        query.areaOfBuilding ? matchParams.areaOfBuilding = query.areaOfBuilding : '';
        query.rooms ? matchParams.rooms = query.rooms : '';
        query.price ? matchParams.price = query.price : '';

        // for only view publics
        if (!user || (user && user.is_superuser !== 1)) {
            matchParams.isPublic = true;
        }

        if (query.latlng) {
            const coordinates = query.latlng.split(',').map((c) => +c);

            const products = await db["Product"]
                .aggregate([
                    {
                        $geoNear: {
                            "near": {
                                "type": "Point",
                                coordinates,
                            },
                            maxDistance: query.maxDistance || 1000000,
                            distanceField: 'distance',
                            spherical: true
                        },
                    },
                    {
                        $match: matchParams
                    }
                ])
                // .lookup({
                //     from: "users",
                //     localField: "userId",
                //     foreignField: "_id",
                //     as: "userId",
                // })
                // .unwind('userId')
                // .lookup({
                //     from: "categories",
                //     localField: "categoryId",
                //     foreignField: "_id",
                //     as: "categoryId",
                // })
                // .unwind('categoryId')
                .exec();

            const slicedProducts = pagination.limit
                ? products.slice(pagination.offset, pagination.offset + pagination.limit)
                : products;

            slicedProducts.forEach((sp) => {
                sp.id = sp._id;
                sp.categoryId.id = sp.categoryId._id;
                sp.userId.id = sp.userId._id;
                sp.userId.phone = sp.userId.phone ? decrypt(sp.userId.phone) : sp.userId.phone;
                return sp;
            });

            return {
                hits: slicedProducts,
                pagination: {
                    ...pagination,
                    total: products.length,
                },
            };
        } else {
            const products = await db["Product"]
                .find({
                    ...matchParams
                })
                .sort(query.sorting)
                .skip(pagination.offset)
                .limit(pagination.limit)
                .populate('userId categoryId')
                .exec();
            const total = await db["Product"]
                .find({ ...matchParams })
                .count()
                .exec();
            return {
                hits: products,
                pagination: {
                    ...pagination,
                    total,
                },
            };
        }


    },

    productFindUserProducts: async (args, req) => {
        const query = args.query ? args.query : args;
        const user = req.session.user;
        const pagination = query.pagination
            ? query.pagination
            : { offset: 0, limit: 10 };

        const params = {};
        const productParams = {};
        query.email ? params.email = query.email : '';
        query.userId ? params._id = query.userId : '';

        // for only view publics
        if (!user || (user && user.is_superuser !== 1)) {
            productParams.isPublic = true;
        }

        const targetUser = await db["User"].findOne({
            ...params,
            status_auth: "active",
        });
        const products = await db["Product"]
            .find({
                userId: targetUser.id,
                ...productParams
            })
            .skip(pagination.offset)
            .limit(pagination.limit);
        const total = await db["Product"]
            .find({
                userId: targetUser.id,
                ...productParams
            })
            .count();

        return {
            hits: products,
            pagination: {
                ...pagination,
                total: total,
            },
        };
    },

    productFindMyProducts: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;
        const pagination = query.pagination
            ? query.pagination
            : (!query.isMap
                ? { offset: 0, limit: 10 }
                : { offset: undefined, limit: undefined }
            );

        const matchParams = { userId: new mongoose.Types.ObjectId(creator), };
        query.categoryId
            ? matchParams.categoryId = new mongoose.Types.ObjectId(query.categoryId)
            : '';
        query.area ? matchParams.area = query.area : '';
        query.pricePerMeter ? matchParams.pricePerMeter = query.pricePerMeter : '';
        query.areaOfBuilding ? matchParams.areaOfBuilding = query.areaOfBuilding : '';
        query.rooms ? matchParams.rooms = query.rooms : '';
        query.price ? matchParams.price = query.price : '';

        if (query.latlng) {
            const coordinates = query.latlng.split(',').map((c) => +c);

            const products = await db["Product"]
                .aggregate([
                    {
                        $geoNear: {
                            "near": {
                                "type": "Point",
                                coordinates,
                            },
                            maxDistance: query.maxDistance || 1000000,
                            distanceField: 'distance',
                            spherical: true
                        },
                    },
                    {
                        $match: matchParams
                    },
                ])
                .lookup({
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userId",
                })
                .unwind('userId')
                .lookup({
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryId",
                })
                .unwind('categoryId')
                .exec();

            const slicedProducts = pagination.limit
                ? products.slice(pagination.offset, pagination.offset + pagination.limit)
                : products;

            slicedProducts.forEach((sp) => {
                sp.id = sp._id;
                sp.categoryId.id = sp.categoryId._id;
                sp.userId.id = sp.userId._id;
                sp.userId.phone = sp.userId.phone ? decrypt(sp.userId.phone) : sp.userId.phone;
                return sp;
            })

            return {
                hits: slicedProducts,
                pagination: {
                    ...pagination,
                    total: products.length,
                },
            };
        } else {
            const params = {};
            Object.keys(query).forEach((key) => {
                if (query[key]) {
                    params[key] = query[key];
                }
            })
            delete params.sorting;
            const products = await db["Product"]
                .find({
                    userId: creator,
                    ...params
                })
                .sort(query.sorting)
                .skip(pagination.offset)
                .limit(pagination.limit)
                .exec();
            
            const total = await db["Product"]
                .find({
                    userId: creator,
                    ...params
                })
                .count();

            return {
                hits: products,
                pagination: {
                    ...pagination,
                    total: total,
                },
            };
        }
    },

    productFindMyLikedProducts: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;
        const pagination = query.pagination
            ? query.pagination
            : { offset: 0, limit: 10 };

        // will be liked
        const user = await db["User"].findById(creator);
        const ids = await user.likes.items.map((ul) => {
            return ul.productId;
        });
        const products = await db["Product"]
            .find({ _id: { $in: ids } })
            .skip(pagination.offset)
            .limit(pagination.limit);
        const total = await db["Product"].find({ _id: { $in: ids } }).count();

        return {
            hits: products,
            pagination: {
                ...pagination,
                total: total,
            },
        };
    },
};
