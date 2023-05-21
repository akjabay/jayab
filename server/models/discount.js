const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema({
    discountPercentage: {
        type: Number,
        default: 0,
    },
    orderIds: [{
        type: Schema.Types.ObjectId,
        ref: "Order",
    }],
    expireLimit: {
        type: Number,
        default: 0
    },
    expireDate: {
        type: Date
    },
},
    {
        timestamps: true,
    })

const discount = mongoose.model("Discount", discountSchema);

module.exports = discount;