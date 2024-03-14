const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 8000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const userController = require('./controller/user');

app.get('/hi', userController.hiApi);
app.get('/login', userController.loginApi);
app.get('/signup', userController.signupApi);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}` );
});

