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
app.post('/user/onboard', userController.onboardApi);
app.get('/user/onboard/check', userController.checkOnboardApi);
app.get('/user/hashtag');

function checkParam(req, res, next) {
    req.headers.param = req.params.id;
    next();
}


// -------------------Proxy------------------------------//
app.use('/hi', proxyController.verifyToken, proxyController.proxy('/hi')); //proxy 예시
app.use('/test/:id', proxyController.proxy(`/test/:id`));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

