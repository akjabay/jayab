const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        discountId: {
            type: Schema.Types.ObjectId,
            ref: "Discount",
        },
        paymentWallet: {
            type: String,
        },
        transactionHash: {
            type: String,
        },
        payedAmountFromUser: {
            type: String,
        },
        payedCommissionAmount: {
            type: String,
        },
        commissionPercentage: {
            type: Number,
            default: 0
        },
        commissionUserId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        expireDate: {
            type: Date,
            require: true
        },
        status: {
            type: String,
            enum : ['active','inactive', 'expired'],
            default: 'inactive'
        }

    },
    {
        timestamps: true,
    }
);

const order = mongoose.model("Order", orderSchema);

module.exports = order;
