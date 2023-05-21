const db = require("../../models/index");
const { decrypt } = require("../../middlewares/encryption");

module.exports = {
    categoryCreate: async (args, req) => {
        const input = args.input ? args.input : args;
        const errors = [];
        const params = {
            name : input.name,
            fa_name : input.fa_name,
            en_name : input.en_name,
        };

        if (input.parent_id) {
            const parentCategory = await db["Category"].findOne({ name: input.parent_id });
            params.parent_id = parentCategory.name;
        } else {
            params.parent_id = 'root'
        }

        const checkNameUnique = await db["Category"].findOne({ name: params.name });
        if (checkNameUnique) {
            errors.push({
                message: "incurrect category name!",
            });
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        

        return await db["Category"].create(params);
    },

    categoryUpdate: async (args, req) => {
        const input = args.input ? args.input : args;
        const id = input.id;
        const params = {
            fa_name : input.fa_name,
            en_name : input.en_name,
        };

        return await db["Category"].findByIdAndUpdate(id, params, { new: true });
    },

    categoryFind: async (args, req) => {
        const query = args.query ? args.query : args;
        const categoryId = query.categoryId;

        return await db["Category"].findById(categoryId)
    },

    categoryDelete: async (args, req) => {
        const input = args.input ? args.input : args;
        const categoryId = input.categoryId;
        const errors = [];

        const category = await db["Category"].findById(categoryId);
        if (!category) {
            errors.push({
                message: "incurrect category id!",
            });
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }
        
        await category.delete();
        return category;
    },

    categoryFindByCategory: async (args, req) => {
        const query = args.query ? args.query : args;
        const categoryId = query.categoryId;
        const language = query.language;
        const pagination = query.pagination
            ? query.pagination
            : { offset: 0, limit: 10 };
        const errors = [];
        
        const category = await db["Category"].findById(categoryId)
            .populate('productIds productIds.userId productIds.categoryId')
            .exec();

        if (!category) {
            errors.push({
                message: "incurrect category id!",
            });
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }
        
        const total = category.productIds.length;

        const obj = JSON.parse(JSON.stringify(category));
        obj.productIds = pagination.limit
            ? category.productIds.slice(pagination.offset, pagination.offset + pagination.limit)
            : category.productIds;

        return {
            ...obj,
            pagination: {
                ...pagination,
                total,
            },
        };
    },

    categoryFindAll: async (args, req) => {
        return await db["Category"].find();
    },

};
