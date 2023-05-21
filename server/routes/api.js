const express = require('express');
const path = require('path');
const router = express.Router();
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("../graphql/schema/index");
const graphqlResolver = require("../graphql/resolvers/index");
const mainRoutes = require("./main");
const guard = require("../middlewares/guard");

router.use("/main", mainRoutes);
router.use("/public", express.static(path.join(__dirname, "../uploads")));
router.use("/graphql", guard);

// graphql
router.use(
    "/graphql",
    graphqlHTTP((req, res, next) => ({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || "An error occurred.";
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data };
        },
    }))
);


module.exports = router;
