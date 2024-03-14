const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 8001;
const app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const userController = require('./controller/user');
const proxyController = require('./proxy/proxy');

// app.get('/hi', proxyController.verifyToken, userController.hiApi);
app.get('/login', userController.loginApi);
app.get('/signup', userController.signupApi);

// -------------------Proxy------------------------------//
app.use('/hi', proxyController.verifyToken, proxyController.proxy('/hi')); //proxy 예시

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}` );
});

