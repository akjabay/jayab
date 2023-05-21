const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        fa_name: {
            type: String,
            required: true,
        },

        en_name: {
            type: String,
            required: true,
        },

        parent_id: {
            type: String,
            required: false,
        },

        icon_url: {
            type: String,
            required: false,
        },

        icon_url_fa: {
            type: String,
            required: false,
        },

        full_fa_name: {
            type: String,
            required: false,
        },

        productIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
