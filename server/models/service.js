const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
    {
        codename: {
            type: String,
            required: true,
        },

        persian_codename: {
            type: String,
            required: true,
        },

        persian_accesses: {
            type: String,
        },

        accesses: {
            type: String,
        },

        planId: {
            type: Schema.Types.ObjectId,
            ref: "Plan",
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
