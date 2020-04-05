const express = require('express');
const app = express();
const csv = require('csvtojson');

async function convertToJSON() {
    const jsonObj = await csv().fromFile("UIPATH2.csv");
    let returnObj = [];
    for (let i = 0; i < jsonObj.length; i++) {
        const obj = jsonObj[i];
        const data = {
            id: Math.floor(Math.random(34534)*1000),
            name: obj.name,
            price: parseFloat(obj.price.replace(/[^0-9\.]+/g, '')),
            stock: 4,
            imageUrl: "https:" + obj.imageUrl,
            type: "Hand Sanitizer",
            seller: "Walmart"
        }
        returnObj.push(data);
    }
    return returnObj;
}

app.get('/get_item_data', (req, res) => {
    convertToJSON().then(jsonObj => res.end(JSON.stringify(jsonObj)));
});

app.listen(3000 || process.env.PORT);