const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionSchema = new Schema(
    {
        codename: {
            type: String,
            required: true,
        },

        persian_codename: {
            type: String,
            required: true,
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

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
