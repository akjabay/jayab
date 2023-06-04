"use strict";

import axios from "axios";
import authHeader from "@/middleware/authHeader.js";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//     "application/x-www-form-urlencoded";
// // axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://avandaneh.iran.liara.run';
// // axios.defaults.headers.common["Access-Control-Allow-Origin"] =
// //     "http://localhost:8050";
// axios.defaults.headers.common["Access-Control-Allow-Headers"] =
//     "origin, x-requested-with, content-type, accept";
// axios.defaults.headers.common["Access-Control-Allow-Methods"] =
//     "GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK";
// axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const config = {
    baseURL:
        process.env.baseURL ||
        process.env.apiUrl ||
        // "http://localhost:1256/api",
        "https://jayabserver.iran.liara.run/api",
    // baseURL: process.env.baseURL || process.env.apiUrl || "https://avandaneh.iran.liara.run/api",
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        config.headers = authHeader().headers;
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        if (error.message == "Request failed with status code 403") {
            window.alert('شما دسترسی به این بخش ندارید لطفا دسترسی را از طریق مدیر فعال کنید! متن خطا: \n' + error.message)
        }
        return Promise.reject(error);
    }
);

export default _axios;
