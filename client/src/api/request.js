import { api } from "/src/boot/axios";
import authHeader from "/src/middleware/authHeader.js";


api.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        config.headers = authHeader().headers;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

api.getImageUrl = (screen, imageUrl, isThumb, isCard, isBig) => {
    const imageWidthUrl = isBig
      ? '/public/'
      : (!isCard
        ? isThumb
          ? '/public/wsm/'
          : (screen.gt.sm
            ? '/public/'
            : '/public/wmd/')
        : '/public/wmd/');
    return api.defaults.baseURL + imageWidthUrl + imageUrl;
}

// Add a response interceptor
api.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default api;
