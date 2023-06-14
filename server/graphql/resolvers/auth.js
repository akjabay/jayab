const jsonwebtoken = require("jsonwebtoken");
const db = require("../../models/index");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;
const { encrypt, decrypt } = require("../../middlewares/encryption.js");
const cities = require('../../data/city.json');
const { subscriptionsToPermissions } = require('../../middlewares/authMiddleware.js');
const { sendMail } = require("../../middlewares/mail.js");


module.exports = {
    authSignup: async (args, req) => {
        const input = args.input ? args.input : args;
        const name = input.name;
        const email = input.email;
        const phone = input.phone;
        const address = input.address;
        const password = input.password;
        const errors = [];

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errors.push({
                message: "this user is exists!",
            });
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const username = input.username
            ? input.username
            : email.split('@')[0] + email.split('@')[1].slice(0, 1);

        // validation code for email or phone
        const code = 12321;
        // const code = Math.floor(Math.random() * 90000) + 10000;
        const params = {
            code: code,
            name: name,
            username: username,
            email: email.toLocaleLowerCase(),
            phone: encrypt(phone),
            address: address,
            password: password,
        };

        username.length < 2
            ? errors.push({
                message: "username must have at least 2 characters",
            })
            : null;

        const exUser = await db["User"].findOne({ email: email });

        if (exUser && exUser.status_auth === "inactive") {
            params.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            // //send code via sms or email
            // const res = await sendMail({ email, subject: 'Verification Code AvanDaneh.com', text: `${code}` });
            // if (!res.success) {
            //     errors.push({
            //         message: "email not sent!",
            //     });
            //     const error = new Error("email not sent!");
            //     error.data = errors;
            //     error.code = 422;
            //     throw error;
            // }

            return await db["User"].findByIdAndUpdate(exUser.id, params, { new: true });
        } else if (exUser) {
            errors.push({
                message: "this user is exists!",
            });
        }

        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        if (input.cityId) {
            params.city = cities.find((c) => c.id === input.cityId)
        }

        const user = new db["User"](params);
        return await user.save();
    },

    authVerify: async (args, req) => {
        const input = args.input ? args.input : args;
        const email = input.email;
        const password = input.password;
        const code = input.code;
        const errors = [];

        const user = await db["User"].findOne({
            email: email,
            status_auth: "inactive",
        });
        // code weill be invalid after 5 mins
        const upass = user ? user.password : "";
        const verify = bcrypt.compareSync(password, upass);
        if (!verify) {
            errors.push({
                message: "you have not permission",
            });
        }
        const now = new Date().getTime() - 5 * 60 * 1000;
        if (!user) {
            errors.push({
                message: "user is not exists",
            });
        } else if (
            +code !== +user.code ||
            now > new Date(user.updatedAt).getTime()
        ) {
            errors.push({
                message: "code is incorrect or expired",
            });
        }

        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const token = jsonwebtoken.sign(
            {
                id: user.id,
            },
            SECRET_KEY,
            {
                expiresIn: 6000000,
            }
        );
        const permissions = await db["Permission"].find({
            $or: [
                { codename: { $regex: "read" } },
                { codename: "write comment" },
            ]
        });
        const updatedUser = await db["User"].findByIdAndUpdate(
            user.id,
            {
                status_auth: "active",
                permissions: permissions.map((p) => p.id)
            },
            { new: true }
        ).populate("permissions subscriptions.planId subscriptions.serviceId");
        updatedUser.phone = updatedUser.phone ? decrypt(updatedUser.phone) : updatedUser.phone;
        req.session.user = updatedUser;

        return {
            user: updatedUser,
            token
        };
    },

    authLogin: async (args, req) => {
        const query = args.query ? args.query : args;
        const params = {
            status_auth: "active",
            is_active: 1
        };
        query.username ? (params.username = query.username) : null;
        query.phone ? (params.phone = encrypt(query.phone)) : null;
        query.email ? (params.email = (query.email).toLocaleLowerCase()) : null;
        query.is_superuser ? (params.is_superuser = query.is_superuser) : null;
        const password = query.password;
        const errors = [];

        let user = await db["User"].findOne(params)
            .populate("permissions subscriptions.planId subscriptions.serviceId");
        if (!user) {
            errors.push({
                message: "user not founded!",
            });
        }
        let token;
        const upass = user ? user.password : "";
        const verify = bcrypt.compareSync(password, upass);
        if (verify) {
            token = jsonwebtoken.sign(
                {
                    id: user.id,
                },
                SECRET_KEY,
                {
                    expiresIn: 6000000,
                }
            );

            if (user && user.subscriptions.length > 0) {
                const codenames = subscriptionsToPermissions(user);
                if (codenames && codenames.length > 0) {
                    const modifiedCodenames = codenames.filter((cn) => {
                        const index = user.permissions.findIndex((up) => up.codename === cn);
                        return index === -1;
                    }).map((cn) => { return { codename: cn } });
                    const subPermissions = await db["Permission"].find({
                        $or: modifiedCodenames,
                    });
                    user.permissions = [...user.permissions, ...subPermissions];
                }
            }

            req.session.user = user;
        } else {
            token = null;
            user = null;
        }

        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        user && user.phone ? user.phone = decrypt(user.phone) : '';

        return {
            user: user,
            token: token,
        };
    },

    authUpdate: async (args, req) => {
        const creator = req.creator;
        const user = req.session.user;
        const input = args.input ? args.input : args;
        const params = {};
        input.id && user.is_superuser === 1 ? (params._id = input.id, params.username = input.username) : params._id = creator;
        const errors = [];

        if (input.password) {
            const verify = bcrypt.compareSync(input.password, user.password);
            if (verify && input.new_password.length >= 8) {
                const salt = await bcrypt.genSalt(10); //whatever number you want
                input.password = await bcrypt.hash(input.new_password, salt);
            } else {
                errors.push({
                    message: "password is incorrect",
                });
            }
        } else {
            delete input.password
        }

        if (input.permissions) {
            input.permissions = input.permissions.split(',');
            input.permissions.forEach(async (permissionId) => {
                if (!user.permissions.includes(permissionId)) {
                    await db["Permission"].findByIdAndUpdate(
                        permissionId,
                        {
                            $push: {
                                users: creator
                            }
                        },
                        { new: true }
                    )
                }
            });
        }

        if (input.cityId) {
            input.city = cities.find((c) => c.id === input.cityId)
        }

        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        if (user.is_superuser) {
            input.is_superuser ? input.is_superuser = 1 : '';
        }

        const updatedUser = await db["User"]
            .findOneAndUpdate(params, input, { new: true })
            .populate("permissions subscriptions.planId subscriptions.serviceId")
            .exec();
        updatedUser.phone ? updatedUser.phone = decrypt(updatedUser.phone): '';
        return updatedUser;
    },

    authEditProfile: async (args, req) => {
        const input = args.input ? args.input : args;
        const creator = req.creator;
        const name = input.name;
        const username = input.username;
        const address = input.address;
        const password = input.password;

        const errors = [];
        const updateParams = {};

        const user = await db["User"].findById(creator);

        if (!user) {
            errors.push({
                message: "user not founded!",
            });
        }

        name ? updateParams.name = name : '';
        username ? updateParams.username = username : '';
        address ? updateParams.address = address : '';
        password ? updateParams.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10)) : '';

        username && username.length < 2
            ? errors.push({
                message: "username must have at least 2 characters",
            })
            : null;

        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const updatedUser = await db["User"].findByIdAndUpdate(user.id, updateParams, { new: true })
            .populate("permissions subscriptions.planId subscriptions.serviceId");

        if (updatedUser.subscriptions.length > 0) {
            const codenames = subscriptionsToPermissions(updatedUser);
            console.log(codenames, 'codenames')
            if (codenames && codenames.length > 0) {
                const modifiedCodenames = codenames.filter((cn) => {
                    const index = updatedUser.permissions.findIndex((up) => up.codename === cn);
                    return index === -1;
                }).map((cn) => { return { codename: cn } })
                const subPermissions = await db["Permission"].find({
                    $or: modifiedCodenames,
                });
                updatedUser.permissions = [...updatedUser.permissions, ...subPermissions];
            }
        }

        updatedUser.phone = updatedUser.phone ? decrypt(updatedUser.phone) : updatedUser.phone;
        req.session.user = updatedUser;

        return updatedUser;
    },

    authResetPassword: async (args, req) => {
        const input = args.input ? args.input : args;
        const params = { status_auth: "active" };
        params.email = input.email;
        const errors = [];

        const user = await db["User"].findOne(params)
            .populate("permissions subscriptions.planId subscriptions.serviceId");
        if (!user) {
            errors.push({
                message: "user not founded!",
            });
        }

        // validation code for email or phone
        const code = Math.floor(Math.random() * 90000) + 10000;
        //send code via sms or email
        const res = await sendMail({ email: user.email, subject: 'Verification Code AvanDaneh.com', text: `${code}` });
        if (!res.success) {
            errors.push({
                message: "email not sent!",
            });
            const error = new Error("email not sent!");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const dbUser = await db["User"].findByIdAndUpdate(user.id, { code }, { new: true })
            .select('-password').exec();
        dbUser.phone = dbUser.phone ? decrypt(dbUser.phone) : dbUser.phone;
        return dbUser;
    },

    authResetPasswordVerify: async (args, req) => {
        const input = args.input ? args.input : args;
        const params = { status_auth: "active" };
        input.username ? (params.username = input.username) : null;
        input.phone ? (params.phone = encrypt(input.phone)) : null;
        input.email ? (params.email = input.email) : null;
        const code = input.code;
        const password = bcrypt.hashSync(input.password, bcrypt.genSaltSync(10));;
        const errors = [];

        params.status_auth = 'active'

        const user = await db["User"].findOne(params)
            .populate("permissions");
        if (!user) {
            errors.push({
                message: "user not founded!",
            });
        }

        const now = new Date().getTime() - 5 * 60 * 1000;
        if (
            +code !== +user.code ||
            now > new Date(user.updatedAt).getTime()
        ) {
            errors.push({
                message: "code is incorrect or expired",
            });
        }

        if (errors.length > 0) {
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error;
        }


        const dbUser = await db["User"].findByIdAndUpdate(user.id, { password }, { new: true });
        dbUser.phone = dbUser.phone ? decrypt(dbUser.phone) : dbUser.phone;
        return dbUser;
    },

    authCheckUsername: async (args, req) => {
        const creator = req.creator;
        const query = args.query ? args.query : args;

        const user = await db["User"].findOne({
            username: query.username,
            status_auth: "active",
        });
        const isexist = !user || user.id === creator
            ? false
            : true;

        return isexist;
    },

    authLogout: async (args, req) => {
        const creator = req.creator;
        req.session.destroy(function (err) {
            if (err) {
                throw new Error("session error");
            }
        });
        return creator;
    },

    authFindMe: async (args, req) => {
        const creator = req.creator;
        const user = await db["User"]
            .findById(creator)
            .populate("permissions subscriptions.planId subscriptions.serviceId")
            .exec();

        user.phone = user.phone ? decrypt(user.phone) : user.phone;
        if (user.subscriptions.length > 0) {
            const codenames = subscriptionsToPermissions(user);
            if (codenames && codenames.length > 0) {
                const modifiedCodenames = codenames.filter((cn) => {
                    const index = user.permissions.findIndex((up) => up.codename === cn);
                    return index === -1;
                }).map((cn) => { return { codename: cn } });
                const subPermissions = await db["Permission"].find({
                    $or: modifiedCodenames,
                });
                user.permissions = [...user.permissions, ...subPermissions];
            }
        }

        return user;
    },
};
