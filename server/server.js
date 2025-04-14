const http = require('http');
const express = require('express')
const app = express()

const mysqlConnector = require('./mysql-connector.js')

const webServer = http.createServer(app);
webServer.listen(8443, () => {
    console.log("server live at localhost:8443/");
})

app.get('/', async (req, res) => {
    res.send("server is live");
});

app.get('/test/', async (req, res) => {
    let data = await mysqlConnector.getTable("SELECT * FROM cs312_t31.test;");
    res.send(data);
});
