const db = require("../../models/index");

module.exports = {
    serviceCreate: async (args, req) => {
        const input = args.input ? args.input : args;
        const errors = [];
        const params = {
            codename : input.codename,
            persian_codename : input.persian_codename,
        };
        

        return await db["Service"].create(params);
    },

    serviceUpdate: async (args, req) => {
        const input = args.input ? args.input : args;
        const id = input.id;
        const params = {
            codename : input.codename,
            persian_codename : input.persian_codename,
        };

        return await db["Service"].findByIdAndUpdate(id, params, { new: true });
    },

    serviceFind: async (args, req) => {
        const query = args.query ? args.query : args;
        const id = query.id;

        return await db["Service"].findById(id)
    },

    serviceDelete: async (args, req) => {
        const input = args.input ? args.input : args;
        const serviceId = input.serviceId;
        const errors = [];

        const service = await db["Service"].findById(serviceId);
        if (!service) {
            errors.push({
                message: "incurrect service id!",
            });
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }
        
        await service.delete();
        return service;
    },

    serviceFindAll: async (args, req) => {
        return await db["Service"].find();
    },

};
