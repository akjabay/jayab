const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const session = require("express-session");
const uploader = require("./middlewares/uploader");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require('cookie-parser')
const config = require("./config");
const dotenv = require('dotenv');
dotenv.config();
const authJWT = require("./middlewares/authjwt");
const apiRoutes = require("./routes/api");
const { DATABASE, ONLINE_DATABASE, SECRET_KEY, PORT } = process.env;

const port = PORT || process.env.LIARA_URL || 1280;
const databaseUrl = ['dev'].includes(config.mode) ? DATABASE : ONLINE_DATABASE;

const store = new MongoDBStore({
    uri: databaseUrl,
    collection: "sessions",
});
const path = require('path');
const STATIC = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC, 'spa/index.html');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(uploader());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(
    session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: store,
        httpOnly: true,
    })
);

app.use(cookieParser());

// routes
app.use(authJWT);
app.use("/api", apiRoutes)


app.get('/', function (req, res) {
    res.sendFile(INDEX);
});
app.use('/dist', express.static(STATIC));


// error handler
app.use((error, req, res, next) => {
    res.send({
        success: false,
        error: error.toString(),
    });
});

// Starting database and Server
mongoose.set('strictQuery', false);
mongoose.connect(databaseUrl, config.database_options, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
        require('./seed/index').run().then(() => {
            app.listen(port, () => {
                console.log(`server is running on port: ${port}`);
            });
        }).catch((error) => {
            console.log(error);
        });
    }
});
