const authController = require("./auth");
const userController = require("./user");
const categoryController = require("./category");
const permissionController = require("./permission");
const productController = require("./product");
const mapController = require("./map");
const serviceController = require("./service");
const orderController = require("./order");

const rootResolver = {
    ...authController,
    ...userController,
    ...categoryController,
    ...permissionController,
    ...productController,
    ...mapController,
    ...serviceController,
    ...orderController,
};

module.exports = rootResolver;
