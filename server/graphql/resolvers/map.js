const fs = require('fs');
const path = require('path');

module.exports = {

    mapFind: async (args, req) => {
        const query = args.query ? args.query : args;
        const type = query.type;

        if (['dafvah', 'dafreza'].includes(type)) {
            const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/' + type + '.json')));
            return data;
        }
        if (['all'].includes(type)) {
            let allData = [];
            const jsonsInDir = fs.readdirSync(path.join(__dirname, '../../data/'))
                .filter(file => path.extname(file) === '.json');

            jsonsInDir.forEach(file => {
                const fileData = fs.readFileSync(path.join(__dirname, '../../data/', file));
                const json = JSON.parse(fileData.toString());
                allData = [ ...allData, ...json ];
            });
            const data = allData.map((d) => {
                return {
                    "index": d.index || d.id,
                    "position": d.position || d.fixTime,
                    "lat": d.lat || d.latitude,
                    "lon": d.lon || d.longitude,
                    "speed": d.speed || d.speed,
                    "direction": d.direction || d.altitude,
                    "gps": "GPS"
                }
            }).filter((d) => d.lat);
            // fs.writeFileSync('complete-data.json', JSON.stringify(data))
            return data;
        }
    },

};
