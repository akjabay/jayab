const { Axios } = require('axios');
const { NESHAN_API } = process.env;

const api = new Axios({
    baseURL: 'https://api.neshan.org/v4/'
});
api.defaults.headers['Api-Key'] = NESHAN_API;

const direction = async (args = []) => {
    const {
        type = 'car',
        origin,
        destination,
        waypoints,
        latitude,
        longitude,
        avoidTrafficZone,
        avoidOddEvenZone,
        alternative,
    } = args;

    try {

        const res = await api.get('/direction', {
            params: {
                type,
                origin,
                destination,
                waypoints,
                latitude,
                longitude,
                avoidTrafficZone,
                avoidOddEvenZone,
                alternative,
            }
        })

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    direction
}