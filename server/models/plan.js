const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        featureDescriptions: String,
        tags: String,
        position: Number, // index in lists, lower comes first
        dateCreated: { type: Date, default: Date.now },
        isAvailable: { type: Boolean, default: true }, // false = a retired plan
        allowMultiple: { type: Boolean, default: false }, // true = you can have multiple Subscriptions with the same Plan reference
        price: {
            month: Number,
            quarter: Number,
            year: Number,
            once: Number,
            currency: String
        },
        trialDays: { type: Number },
        services: [{ type: Schema.Types.ObjectId, ref: 'Service' }], // see service.js
        metadata: {}
    },
    {
        timestamps: true,
    }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
