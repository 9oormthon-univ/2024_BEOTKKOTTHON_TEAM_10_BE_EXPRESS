const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 8001;
const app = express();
const cors = require('cors');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const userController = require('./controller/user');
const proxyController = require('./proxy/proxy');
const scholarshipController = require('./controller/scholarship');

app.get('/test', userController.testApi);
app.post('/user/login', userController.loginApi);
app.post('/user/signup', userController.signupApi);
app.post('/user/onboard',proxyController.verifyToken, userController.onboardApi);
app.get('/user/onboard/check',proxyController.verifyToken, userController.checkOnboardApi);
app.get('/user/hashtag', proxyController.verifyToken, userController.hashtagApi);
app.get('/user/login/check', proxyController.verifyToken, userController.checkLoginApi);



// -------------------------scholarship---------------------------
app.post('/scholarship/generate', scholarshipController.createScholarshipApi);


// -------------------Proxy------------------------------//
app.use('/hi', proxyController.verifyToken, proxyController.proxy('/hi')); //proxy 예시

app.use('/scholarship/all', proxyController.proxy('/scholarship/all'));
app.use('/scholarship/all/new', proxyController.proxy('/scholarship/all/new'));
app.use('/scholarship/user', proxyController.verifyToken, proxyController.proxy('/scholarship/user'));
app.use('/scholarship/user/amount', proxyController.verifyToken, proxyController.proxy('/scholarship/user/amount'));
app.use('/scholarship/each', proxyController.proxy('/scholarship/each'));
app.use('/scholarship/each/status', proxyController.proxy('/scholarship/each/status'));
app.use('/scholarship/save', proxyController.verifyToken, proxyController.proxy('/scholarship/save'));


app.use('/document', proxyController.proxy('/document'));
app.use('/document/each', proxyController.proxy('/document/each'));

app.use('/user/all', proxyController.proxy('/user/all'));





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

