const { buildSchema } = require("graphql");
const auth = require("./auth");
const user = require("./user");
const category = require("./category");
const permission = require("./permission");
const product = require("./product");
const order = require("./order");
const map = require("./map");
const service = require("./service");
const nest = require("./nest");

const RootQuery =
    `
    type RootQuery {
        ` +
    auth.root.query +
    user.root.query +
    category.root.query +
    permission.root.query +
    product.root.query +
    order.root.query +
    map.root.query +
    service.root.query +
    nest.root.query +
    `}`;

const RootMutation =
    `
    type RootMutation {
        ` +
    auth.root.mutation +
    user.root.mutation +
    category.root.mutation +
    permission.root.mutation +
    product.root.mutation +
    order.root.mutation +
    map.root.mutation +
    service.root.mutation +
    nest.root.mutation +
    `}`;

module.exports = buildSchema(
    auth.types +
        user.types +
        category.types +
        permission.types +
        product.types +
        order.types +
        map.types +
        service.types +
        nest.types +
        RootQuery +
        RootMutation +
        `
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `
);
