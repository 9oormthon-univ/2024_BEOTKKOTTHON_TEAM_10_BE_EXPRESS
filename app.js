const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/hi', (req, res) => {
    const data = {
        message : "hi sungwon"
    };
    res.json(data);
});

module.exports = app;