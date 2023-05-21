const db = require("../../models/index");

module.exports = {
    permissionCreate: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const params = {
            codename : input.codename,
            persian_codename : input.persian_codename,
        };

        input.userId = creator;

        return await db["Permission"].create(params);
    },

    permissionUpdate: async (args, req) => {
        const creator = req.creator;
        const input = args.input ? args.input : args;
        const permissionId = input.permissionId;
        const params = {
            codename : input.codename,
            persian_codename : input.persian_codename,
        };

        input.userId = creator;

        return await db["Permission"]
            .findByIdAndUpdate(permissionId, params, { new: true });
    },

    permissionFind: async (args, req) => {
        const query = args.query ? args.query : args;
        const permissionId = query.permissionId;

        return await db["Permission"].findById(permissionId)
    },
    
    permissionFindAll: async (args, req) => {
        return await db["Permission"].find();
    },

};
