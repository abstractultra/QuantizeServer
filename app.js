const express = require('express');
const app = express();
const csv = require('csvtojson');
const cheerio = require('cheerio');
const got = require('got');

async function getData() {
    const jsonObj = await csv().fromFile("UiPathOutput.csv");
    let dataArr = [];
    for (let i = 0; i < jsonObj.length; i++) {
        pageURL = jsonObj[i].URL;
        const page = await got("https://www.walmart.ca/" + pageURL);
        const $ = await cheerio.load(page);
        console.log($(".ervhxpq1").eq(0).attr("src"));
        let data = {
            id: Math.floor(Math.random(3452)*355),
            name: jsonObj[i].Name,
            stock: $(".e5qqw235").eq(0).attr("max"),
            price: parseFloat($(".esdkp3p0").eq(0).text().replace("$","")),
            type: "Hand Sanitizer",
            imageUrl: $(".ervhxpq1").eq(0).attr("src"),
            seller: "Walmart",
        }
        dataArr.push(data);
    }
    return dataArr;
}

app.get('/get_item_data', (req, res) => {
    getData().then(dataArr => {
        res.end(JSON.stringify(dataArr));
    });
});

app.listen(3000);