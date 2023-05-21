const jsonwebtoken = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const db = require("../models/index");

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
            req.creator = decodedToken.id
            req.session.user = await db["User"].findById(decodedToken.id).populate("permissions");
            req.session.save();
            next();
        }
    })
};
