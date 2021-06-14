const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGF0bm9ibGVkZXNpZ25zIiwiYSI6ImNrcHZxZ2JqZjE2ZWsyeG8xdDY1Yjl4c28ifQ.JPDpw_pSKADyV3-aHHKhfg&limit=1`;

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            });
        }

    });
};

module.exports = geocode;