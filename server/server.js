const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

const mysqlConnector = require('./mysql-connector.js')

app.use(cors());
app.use(express.json());

const webServer = http.createServer(app);
webServer.listen(8443, () => {
    console.log("server live at localhost:8443/");
})

app.get('/', async (req, res) => {
    res.send("server is live");
});

app.get('/test/', async (req, res) => {
    try {
        let data = await mysqlConnector.getTable("SELECT * FROM cs312_t31.test;");
        res.json(data);
      } catch (err) {
        console.error('Error in /test/ route:', err);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/api/colors/', async (req, res) => {
    let data = await mysqlConnector.getTable("SELECT * FROM cs312_t31.colors;");
    res.send(data);
})
