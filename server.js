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

app.get('/test', userController.testApi);
app.post('/user/login', userController.loginApi);
app.post('/user/signup', userController.signupApi);
app.post('/user/onboard',proxyController.verifyToken, userController.onboardApi);
app.get('/user/onboard/check',proxyController.verifyToken, userController.checkOnboardApi);
app.get('/user/hashtag', proxyController.verifyToken, userController.hashtagApi);
app.get('/user/login/check', proxyController.verifyToken, userController.checkLoginApi);



// -------------------Proxy------------------------------//
app.use('/hi', proxyController.verifyToken, proxyController.proxy('/hi')); //proxy 예시

app.use('/scholarship/all', proxyController.verifyToken, proxyController.proxy('/scholarship/all'));
app.use('/scholarship/all/new', proxyController.verifyToken, proxyController.proxy('/scholarship/all/new'));
app.use('/scholarship/user', proxyController.verifyToken, proxyController.proxy('/scholarship/user'));
app.use('/scholarship/user/mount', proxyController.verifyToken, proxyController.proxy('/scholarship/user/mount'));
app.use('/scholarship/each/status', proxyController.verifyToken, proxyController.proxy('/scholarship/each/status'));
app.use('/scholarship/save', proxyController.verifyToken, proxyController.proxy('/scholarship/save'));
app.use('/document', proxyController.verifyToken, proxyController.proxy('/document'));
app.use('/document/each', proxyController.verifyToken, proxyController.proxy('/document/each'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

