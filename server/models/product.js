const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        pid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },

        latlng: {
            type: String,
            required: true,
        },
        shape: {
            type: { type: String },
            coordinates: {
                type: Array,
            },
        },

        address:  {
            type: String,
            required: true,
        },

        area:  {
            type: Number,
            required: true,
        },

        areaOfBuilding:  {
            type: Number,
            required: false,
        },

        price: {
            type: Number,
            required: false,
        },
        pricePerMeter: {
            type: Number,
            required: false,
        },
        rooms: {
            type: Number,
            required: false,
        },
        details: {
            type: String,
            required: false,
        },

        ownerInfo:  {
            type: String,
            required: true,
        },

        thumbnail: {
            type: String
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

        likes: {
            users: [
                {
                    userId: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                    },
                    likeTime: {
                        type: Date,
                    },
                },
            ],
            like: {
                type: Number,
            },
        },

        status:  {
            type: String,
        },

        isPublic: {
            type: Boolean,
            required: true,
            default: false,
        },

        orderIds: [{
            type: Schema.Types.ObjectId,
            ref: "Order",
        }],

        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        estate: {
            type: String,
            enum: ["inRent", "sold", "notDetermined"],
            default: "notDetermined",
        },

        status: {
            type: String,
            enum: ["active", "deleted"],
            default: "active",
        }

    },
    {
        timestamps: true,
    }
);

productSchema.index({shape:"2dsphere"});


productSchema.methods.addToLikes = function (target) {
    let likesIndex = -1;
    let updatedLikesValues = [];
    if (this.likes.users && this.likes.users[0]) {
        likesIndex = this.likes.users.findIndex((si) => {
            return si.userId.toString() === target.id.toString();
        });
        updatedLikesValues = [...this.likes.users];
    }
    if (likesIndex >= 0) {
        updatedLikesValues[likesIndex].likedTime = new Date().toISOString();
    } else {
        updatedLikesValues.push({
            userId: target.id.toString(),
            likeTime: new Date().toISOString(),
        });
        this.likes.like ? null: this.likes.like = 0;
        this.likes.like++;
    }
    this.likes.users = updatedLikesValues;
    return this.save();
};

productSchema.methods.removeFromLikes = function (target) {
    if (this.likes.users) {
        const dislikedIndex = this.likes.users.findIndex((si) => {
            return si.userId.toString() === target.id.toString();
        });
        const updatedLikesValues = this.likes.users.filter((item) => {
            return item.userId.toString() !== target.id.toString();
        });
        if (dislikedIndex >= 0) {
            this.likes.like--;
        }
        this.likes.users = updatedLikesValues;
        return this.save();
    }
};


const product = mongoose.model("Product", productSchema);

module.exports = product;
