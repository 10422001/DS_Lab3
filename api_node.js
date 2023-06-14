const express = require('express');
const node_api = express();
const {getRndInteger} = require('./final/publisher_final.js')
node_api.get('/sensor', (req, res) => {
    /*
        const date = new Date();
        const daytime = date.getHours() >= 6 && date.getHours() < 18 ? 'day' : 'night';
        const temperature = Math.floor(Math.random() * 30) + 1; // Random temperature between 1 and 30 degrees Celsius
    */
    nrPlusMinus = 2
    temp = getRndInteger(24 - nrPlusMinus, 33 + nrPlusMinus).toString()
    soil = getRndInteger(50 - nrPlusMinus, 60 + nrPlusMinus).toString()
    air = getRndInteger(70 - nrPlusMinus, 100 + nrPlusMinus).toString()
    ph = getRndInteger(5 - 1, 7 + 1).toString()
    luminosity = getRndInteger(0 - nrPlusMinus, 30 + nrPlusMinus).toString()
    console.log(temp + "\t" + soil + "\t" + air + "\t" + ph + "\t" + luminosity)

    const sensorData = {
        temp,
        soil,
        air,
        ph,
        luminosity
    };
    res.json(sensorData);
});

// Start server
node_api.listen(3000, () => {
    console.log('Server is running on port 3000');
});



