const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        name: {
            type: String,
        },

        bio: {
            type: String,
            required: false,
        },

        telegramId: {
            type: String,
        },
        invitedByUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        commissionPercentage: {
            type: Number,
            default: 0
        },
        commissionLimit: {
            type: Number,
            default: 0
        },
        commissionExpire: {
            type: Date,
        },

        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        phone: {
            type: String,
        },

        email: {
            type: String,
            trim: true,
            required: false,
        },

        address: {
            type: String,
            required: false,
        },

        city: {
            type: Object,
            required: false,
        },

        followers_list: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
            },
        ],

        following_list: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
            },
        ],

        request_to_join: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
            },
        ],

        productIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],

        
        likes: {
            items: [
                {
                    productId: {
                        type: Schema.Types.ObjectId,
                        ref: "Product",
                    },
                    likeTime: { type: Date, required: true },
                },
            ],
        },

        images: [
            {
                url: {
                    type: String,
                },
                source: {
                    type: String,
                },
                state: {
                    type: String,
                },
                idx: {
                    type: Number
                },
                fieldname: String,
                originalname: String,
                encoding: String,
                mimetype: String,
                destination: String,
                filename: String,
                path: String,
                size: Number
            },
        ],

        permissions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Permission",
            },
        ],

        is_superuser: {
            type: Number,
            required: true,
            default: 0,
        },

        is_active: {
            type: Number,
            required: true,
            default: 1,
        },

        password: {
            type: String,
            required: true,
        },

        last_login: {
            type: Date,
        },

        avatar_url: {
            type: String,
            required: false,
        },

        code: {
            type: String,
            required: false,
        },

        shop_payed_orders: [
            {
                orderId: {
                    type: Schema.Types.ObjectId,
                    ref: "Order",
                    required: true,
                },
                payed_amount: {
                    type: Number,
                    required: true,
                },
            },
        ],

        subscriptions: [
            {
                serviceId: {
                    type: Schema.Types.ObjectId,
                    ref: "Service",
                    required: true,
                },
                planId: {
                    type: Schema.Types.ObjectId,
                    ref: "Plan",
                    required: true,
                },
                payedDate: { type: Date, default: Date.now },
                expiresAt: Date,
                duration: String,
                status: {
                    type: String,
                    enum: ["active", "inactive", "pending"],
                    default: "pending",
                }
            },
        ],

        status_auth: {
            type: String,
            enum: ["active", "inactive", "limited", "deleted"],
            default: "inactive",
        },
    },
    {
        timestamps: true,
    }
);

// cart process
userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === product.id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex > -1) {
        if (
            this.cart.items[cartProductIndex].quantity < product.amount
        ) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
    } else {
        updatedCartItems.push({
            productId: product.id,
            quantity: newQuantity,
        });
    }
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.minusFromCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === product.id.toString();
    });
    let updatedCartItems = [...this.cart.items];

    if (cartProductIndex > -1) {
        let newQuantity = this.cart.items[cartProductIndex].quantity - 1;
        newQuantity > 0
            ? (updatedCartItems[cartProductIndex].quantity = newQuantity)
            : (updatedCartItems = updatedCartItems.filter((item) => {
                  return item.productId.toString() !== product.id.toString();
              }));
    }
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.removeFromCart = function (product) {
    const updatedCartItems = this.cart.items.filter((item) => {
        return item.productId.toString() !== product.id.toString();
    });

    // refresh first
    this.update({
        cart: {
            items: [],
        },
    });

    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart.items = [];
    return this.save();
};

// like products
userSchema.methods.addToLikes = function (target) {
    const likesIndex = this.likes.items.findIndex((si) => {
        if (si[target.type+'Id']) {
            return si[target.type+'Id'].toString() === target.id.toString();
        }
    });
    const updatedLikesValues = [...this.likes.items];
    if (likesIndex > -1) {
        updatedLikesValues[likesIndex].likedTime = new Date().toISOString();
    } else {
        const newItem = {}
        newItem[target.type+'Id'] = target.id.toString();
        newItem.likeTime = new Date().toISOString()
        updatedLikesValues.push(newItem);
    }
    this.likes.items = updatedLikesValues;
    return this.save();
};

userSchema.methods.removeFromLikes = function (target) {
    const updatedLikesValues = this.likes.items.filter((item) => {
        if (item[target.type+'Id']) {
            return item[target.type + 'Id'].toString() != target.id.toString();
        } else {
            return true
        }
    });
    this.likes.items = updatedLikesValues;
    return this.save();
};

// request to follow
userSchema.methods.addToRequestList = function (target) {
    const requestListIndex = this.request_to_join.findIndex((si) => {
        return si.userId.toString() === target.userId.toString();
    });
    const updatedRequestListValues = [...this.request_to_join];
    if (requestListIndex > -1) {
        updatedRequestListValues[
            requestListIndex
        ].likedTime = new Date().toISOString();
    } else {
        updatedRequestListValues.push({
            userId: target.userId.toString(),
            requestTime: new Date().toISOString(),
        });
    }
    this.request_to_join = updatedRequestListValues;
    return this.save();
};

userSchema.methods.removeFromRequestList = function (target) {
    const updatedRequestListValues = this.request_to_join.filter((item) => {
        return item.userId.toString() !== target.userId.toString();
    });
    this.request_to_join = updatedRequestListValues;
    return this.save();
};

userSchema.methods.acceptFollowRequest = function (target) {
    // first find request
    const requestListIndex = this.request_to_join.findIndex((si) => {
        return si.userId.toString() === target.userId.toString();
    });

    // save userId in following list and targets follower list
    const updatedRequestList = [...this.request_to_join];

    if (requestListIndex > -1) {
        this.following_list = this.following_list.push({
            userId: updatedRequestList[requestListIndex].userId,
            followTime: new Date().toISOString(),
        });

        target.followers_list = target.followers_list.push({
            userId: updatedRequestList[requestListIndex].userId,
            followTime: new Date().toISOString(),
        });

        // update user request list
        updatedRequestList = this.request_to_join.filter((item) => {
            return item.userId.toString() !== target.userId.toString();
        });

        target.save();
    } else {
        throw new Error("request is not exists");
    }

    this.request_to_join = updatedRequestList;
    return this.save();
};

userSchema.methods.rejectFollowRequest = function (target) {
    // first find request
    const requestListIndex = this.request_to_join.findIndex((si) => {
        return si.userId.toString() === target.userId.toString();
    });

    // save userId in following list and targets follower list
    const updatedRequestList = [...this.request_to_join];

    if (requestListIndex > -1) {
        // update user request list
        updatedRequestList = this.request_to_join.filter((item) => {
            return item.userId.toString() !== target.userId.toString();
        });
    } else {
        throw new Error("request is not exists");
    }

    this.request_to_join = updatedRequestList;
    return this.save();
};

userSchema.methods.clearRequestList = function () {
    this.request_to_join = [];
    return this.save();
};

userSchema.methods.unfollow = function (target) {
    // first find following
    const followListIndex = this.following_list.findIndex((si) => {
        return si.userId.toString() === target.userId.toString();
    });

    // save userId in following list and targets follower list
    const updatedFollowingList = [...this.following_list];

    if (followListIndex > -1) {
        target.followers_list = target.followers_list.filter((item) => {
            return item.userId.toString() !== target.userId.toString();
        });

        // update user following list
        updatedFollowingList = this.following_list.filter((item) => {
            return item.userId.toString() !== target.userId.toString();
        });

        target.save();
    } else {
        throw new Error("following is not exists");
    }

    this.following_list = updatedFollowingList;
    return this.save();
};

userSchema.methods.removeFromFollowers = function (target) {
    // first find request
    const followersIndex = this.followers_list.findIndex((si) => {
        return si.userId.toString() === target.userId.toString();
    });

    // save userId in following list and targets follower list
    const updatedFollowersList = [...this.followers_list];

    if (followersIndex > -1) {
        target.following_list = target.following_list.filter((item) => {
            return item.userId.toString() !== target.userId.toString();
        });

        // update user request list
        updatedFollowersList = this.followers_list.filter((item) => {
            return item.userId.toString() !== target.userId.toString();
        });

        target.save();
    } else {
        throw new Error("follower is not exists");
    }

    this.followers_list = updatedFollowersList;
    return this.save();
};

userSchema.pre("save", function (next) {
    var user = this;

    if (!user.isModified("password")) return next();

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
