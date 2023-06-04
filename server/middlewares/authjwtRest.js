const jsonwebtoken = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const db = require("../models/index");
const { subscriptionsToPermissions } = require('../middlewares/authMiddleware.js')

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    jsonwebtoken.verify(authorization, SECRET_KEY, async (err, decodedToken) => {
        if (err || !decodedToken) {
            req.creator = null;
            return res.status(401).send({
                success: false,
                message: "authentication required!"
            })
        }
        if (req.session && req.session.user) {
            req.creator = decodedToken.id
            return next();
        } else {
            req.creator = decodedToken.id;
            const user = await db["User"].findById(decodedToken.id).populate("permissions subscriptions.planId subscriptions.serviceId");
            if (user.subscriptions.length > 0) {
                const codenames = subscriptionsToPermissions(user);
                if (codenames && codenames.length > 0) {
                    const modifiedCodenames = codenames.filter((cn) => {
                        const index = user.permissions.findIndex((up) => up.codename === cn);
                        return index === -1;
                    }).map((cn) => { return { codename: cn } })
                    const subPermissions = await db["Permission"].find({
                        $or: modifiedCodenames,
                    });
                    user.permissions = [...user.permissions, ...subPermissions];
                }
            }
            req.session.user = user;
            req.session.save();
            next();
        }
    })
};
