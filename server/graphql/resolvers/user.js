const db = require("../../models/index");
const bcrypt = require("bcrypt");
const cities = require('../../data/city.json');
const { decrypt } = require("../../middlewares/encryption");

module.exports = {
    userCreate: async (args, req) => {
        const input = args.input ? args.input : args;
        const params = { name: input.name };
        input.phone ? (params.phone = input.phone) : null;
        input.email ? (params.email = input.email) : null;
        params.password = input.password;
        params.username = input.username;

        return await db["User"](params).save();
    },

    userUpdate: async (args, req) => {
        const creator = req.creator;
        const user = req.session.user;
        const input = args.input ? args.input : args;
        const params = input.id ? { _id: input.id } : { username: input.username };
        const errors = [];

        if (input.password) {
            const verify = bcrypt.compareSync(input.password, user.password);
            if (verify && input.new_password.length >= 8) {
                const salt = await bcrypt.genSalt(10); //whatever number you want
                input.password = await bcrypt.hash(input.new_password, salt);
            } else {
                errors.push({
                    message: "password is incorrect",
                });
            }
        } else {
            delete input.password
        }

        if (input.permissions) {
            input.permissions = input.permissions.split(',');
            input.permissions.forEach(async (permissionId) => {
                if (!user.permissions.includes(permissionId)) {
                    await db["Permission"].findByIdAndUpdate(
                        permissionId,
                        {
                            $push: {
                                users: creator
                            }
                        },
                        { new: true }
                    )
                }
            });
        }

        if (input.cityId) {
            input.city = cities.find((c) => c.id === input.cityId)
        }

        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        if (user.is_superuser) {
            input.is_superuser ? input.is_superuser = 1 : '';
        }

        const updatedUser = await db["User"]
            .findOneAndUpdate(params, input, { new: true })
            .populate("permissions");
        updatedUser.phone = decrypt(updatedUser.phone);
        return updatedUser;
    },

    userFind: async (args, req) => {
        const query = args.query ? args.query : args;
        const params = {};
        query.id ? params._id = query.id : '';
        query.email ? params.email = query.email: '';
        const user = await db["User"].findOne(params).populate("permissions");
        user.phone = user.phone ? decrypt(user.phone) : user.phone;
        return user;
    },

    userFindAll: async (args, req) => {
        const query = args.query ? args.query : args;
        const pagination = query.pagination
        ? query.pagination
        : { offset: 0, limit: 10 };

        const params = {};
        query.status_auth == 'not-active'
            ? params.status_auth = {
                $ne: 'active'
            } : '';
        const users = await db["User"].find({
            ...params
        }).skip(pagination.offset).limit(pagination.limit)
        .select("-password")
        .populate("permissions")
        .exec();

        const total = await db["User"].find({
            ...params
        }).count();

        return {
            hits: users,
            pagination: {
                ...pagination,
                total: total,
            },
        };
    },

    userFindByUsername: async (args, req) => {
        const query = args.query ? args.query : args;
        const username = query.username;
        return await db["User"]
            .findOne({ username: username, })
            .select("id avatar_url username")
            .exec();
    },

    userSearch: async (args, req) => {
        const query = args.query ? args.query : args;
        const searchText = query.searchText;
        const pagination = query.pagination
        ? query.pagination
        : { offset: 0, limit: 10 };

        const users = await db["User"].find({
            $or: [
                {
                    username: {
                        $regex: searchText, $options: "i"
                    }
                },
                {
                    name: {
                        $regex: searchText, $options: "i"
                    }
                },
            ],
        }).skip(pagination.offset).limit(pagination.limit)
        .select("-password")
        .populate('permissions')
        .exec();

        const total = await db["User"].find({
            $or: [
                {
                    username: {
                        $regex: searchText, $options: "i"
                    }
                },
                {
                    name: {
                        $regex: searchText, $options: "i"
                    }
                },
            ],
        }).count();

        return {
            hits: users,
            pagination: {
                ...pagination,
                total: total,
            },
        };
    },

    
    userFindMyLikes: async (args, req) => {
        const query = args.query ? args.query : args;
        const creator = req.creator;
        const pagination = query.pagination
            ? query.pagination
            : { offset: 0, limit: 10 };

        const users = await db["User"].findById(creator)
            .populate(
                "likes.items.postId likes.items.productId likes.items.ticketId"
            )
            .select("likes").exec();
        const hits = users.likes.items.slice(pagination.offset, pagination.offset + pagination.limit)
        return {
            hits: hits,
            pagination: {
                ...pagination,
                total: users.likes.items.length,
            },
        };;
    },

    userActivateService: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const errors = [];

        const user = await db["User"].findById(creator);
        const plan = await db["Plan"].findById(input.planId);
        const service = await db["Service"].findById(input.serviceId);

        if (user.subscriptions && user.subscriptions.length > 0) {
    
            const activeSubIdx = user.subscriptions.findIndex((us) => {
                return us.planId === plan.id &&
                us.serviceId === service.id &&
                new Date(us.expiresAt).getTime < new Date().getTime()
            });

            if (activeSubIdx > -1) {
                errors.push({
                    message: "service is active now",
                });
            }

        }

        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const updatedUser = await db["User"].findByIdAndUpdate(user.id, {
            subscriptions: {
                $push: {
                    serviceId: service.id,
                    planId: plan.id,
                    duration: input.duration,
                }
            }
        }).populate('subscriptions.planId subscriptions.serviceId').exec();

        console.log(updatedUser, 'updatedUser')
        return updatedUser;
    },
    // cart
    userAddToCart: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;

        const user = await db["User"].findById(creator);
        const params = input.id ? { _id: input.id } : { pid: input.pid };
        const product = await db["Product"].findOne(params)
            .populate("categoryId").exec();
        return await user.addToCart(product);
    },

    userMinusFromCart: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;

        const user = await db["User"].findById(creator);
        const params = input.id ? { _id: input.id } : { pid: input.pid };
        const product = await db["Product"].findOne(params)
            .select("id").exec();

        return await user.minusFromCart(product);
    },

    userAddCartToCart: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;

        const user = await db["User"].findById(creator);
        await user.clearCart();

        for (item of input) {
            const params = item.productId
                ? { _id: item.productId }
                : { };
            const product = await db["Product"]
                .findOne(params)
                .populate("categoryId").exec();
            for (i = 0; i < item.quantity; i++) {
                await user.addToCart(product);
            }
        }

        return await db["User"].findById(creator);
    },

    userRemoveFromCart: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;

        const user = await db["User"].findById(creator);
        const params = input.id ? { _id: input.id } : { pid: input.pid };
        const product = await db["Product"].findOne(params);

        return await user.removeFromCart(product);
    },

    userClearCart: async (args, req) => {
        const creator = req.creator;

        const user = await db["User"].findById(creator);
        return await user.clearCart();
    },

    // likes
    userAddToLikes: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const errors = [];

        const user = await db["User"].findById(creator);
        const params = input.id ? { _id: input.id } : { pid: input.pid };
        let item = await db["Product"].findOne(params);
        item.type = 'product';

        if (!item) {
            
            errors.push({
                message: "can't find item!"
            })
    
            if (errors.length > 0) {
                const error = new Error("Invalid input.");
                error.data = errors;
                error.code = 422;
                throw error;
            }
        }

        const likedUser = await user.addToLikes(item);
        await item.addToLikes(user);
        return likedUser;

    },

    userRemoveFromLikes: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;

        const user = await db["User"].findById(creator);
        const params = input.id ? { _id: input.id } : { pid: input.pid };

        let errors = [];
        let item = await db["Product"].findOne(params);
        item.type = 'product';

        if (!item) {
            
            errors.push({
                message: "can't find item!"
            })
    
            if (errors.length > 0) {
                const error = new Error("Invalid input.");
                error.data = errors;
                error.code = 422;
                throw error;
            }
        }

        const dislikedUser = await user.removeFromLikes(item);
        await item.removeFromLikes(user);
        return dislikedUser;
    },

    userClearLikes: async (args, req) => {
        const creator = req.creator;

        const user = await db["User"].findById(creator);
        if (user.likes.items && user.likes.items[0]) {
            for (const LikedItem of user.likes.items) {
                let item;
                if (LikedItem.postId) {
                    item = await db["Post"].findOne(params)
                        .select("id").exec();
                } else if (LikedItem.productId) {
                    item = await db["Product"].findOne(params)
                    .select("id").exec();
                } else if (LikedItem.ticketId) {
                    item = await db["Ticket"].findOne(params)
                        .select("id").exec();
                }
        
                if (!item) {
                    
                    errors.push({
                        message: "can't find item!"
                    })
            
                    if (errors.length > 0) {
                        const error = new Error("Invalid input.");
                        error.data = errors;
                        error.code = 422;
                        throw error;
                    }
                }

                await item.removeFromLikes(user);
            }
        }
        return await user.clearLikes();
    },

    // follows
    userAddToRequestList: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const params = input.id
            ? { _id: input.id }
            : { username: input.username };

        const user = await db["User"].findById(creator);
        const targetUser = await db["User"].findOne(params);

        return await targetUser.addToRequestList(user);
    },

    userRemoveFromRequestList: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const params = input.id
            ? { _id: input.id }
            : { username: input.username };

        const user = await db["User"].findById(creator);
        const targetUser = await db["User"].findOne(params);

        return await targetUser.removeFromRequestList(user);
    },

    userAcceptFollowRequest: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const params = input.id
            ? { _id: input.id }
            : { username: input.username };

        const user = await db["User"].findById(creator);
        const targetUser = await db["User"].findOne(params);

        return await user.acceptFollowRequest(targetUser);
    },

    userRejectFollowRequest: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const params = input.id
            ? { _id: input.id }
            : { username: input.username };

        const user = await db["User"].findById(creator);
        const targetUser = await db["User"].findOne(params);

        return await user.rejectFollowRequest(targetUser);
    },

    userClearRequestList: async (args, req) => {
        const creator = req.creator;

        const user = await db["User"].findById(creator);
        return await user.clearRequestList();
    },

    userUnfollow: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;

        const params = input.id
            ? { _id: input.id }
            : { username: input.username };

        const user = await db["User"].findById(creator);
        const targetUser = await db["User"].findOne(params);

        return await user.unfollow(targetUser);
    },

    userRemoveFromFollowers: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;

        const params = input.id
            ? { _id: input.id }
            : { username: input.username };

        const user = await db["User"].findById(creator);
        const targetUser = await db["User"].findOne(params);

        return await user.removeFromFollowers(targetUser);
    },

};
