const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 8001;
const app = express();
const cors = require('cors');
const apn = require('apn');
const cron = require('node-cron');

const apnProvider = new apn.Provider({
    token: {
        key: './AuthKey_N7R2AY8J7S.p8', // 인증 키 경로
        keyId: 'N7R2AY8J7S',
        teamId: 'Q653PU93R6',
    },
    production: false // 개발용인지 아닌지 설정
});

// cron.schedule('5 3 * * *', () => {
// const notification = new apn.Notification({
//     alert: 'Good morning! This is your daily reminder.',
//     sound: 'default',
//     badge: 1,
//     topic: 'WEDLE.CenApp'
// });

//     // 예약된 알림을 보낼 사용자 디바이스 토큰들
//     // const deviceTokens = ['80447a5d2e39593d678ca34c7db057fc8f960521c378400c691cc4fc12f57cc46820055fb15c4df4e4c0e081283e3d556d0cb3c5d924382cf542db2072fce393b9359822ae892dc507589f42439c45c4'];

//     // deviceTokens.forEach(deviceToken => {
//     //   apnProvider.send(notification, deviceToken).then(result => {
//     //     console.log(result);
//     //   }).catch(error => {
//     //     console.error('Error sending push notification:', error);
//     //   });
//     // });
//     const deviceToken = '80447a5d2e39593d678ca34c7db057fc8f960521c378400c691cc4fc12f57cc46820055fb15c4df4e4c0e081283e3d556d0cb3c5d924382cf542db2072fce393b9359822ae892dc507589f42439c45c4';
//     apnProvider.send(notification, deviceToken).then(result => {
//         console.log(result);
//     }).catch(error => {
//         console.error('Error sending push notification:', error);
//         console.error('Failed to send push notification to device:', error.device);
//         console.error('HTTP Status:', error.status);
//         console.error('Response:', error.response);
//     })
//     console.log("hello");
// }, {
//     scheduled: true,
//     timezone: 'Asia/Seoul' // 시간대 설정 (서버가 위치한 지역에 맞게 수정)
// });



// function sendPushNotification() {
//     const notification = new apn.Notification({
//         alert: 'Good morning! This is your daily reminder.',
//         sound: 'default',
//         badge: 1,
//         topic: 'WEDLE.CenApp'
//     });

//     const deviceToken = '80447a5d2e39593d678ca34c7db057fc8f960521c378400c691cc4fc12f57cc46820055fb15c4df4e4c0e081283e3d556d0cb3c5d924382cf542db2072fce393b9359822ae892dc507589f42439c45c4';

//     apnProvider.send(notification, deviceToken).then(result => {
//         console.log(result);
//     }).catch(error => {
//         console.error('Error sending push notification:', error);
//     })

// }

// const interval = 5*1000;
// setInterval(sendPushNotification, interval);




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
app.post('/user/change/password', userController.changePasswordApi);
app.post('/user/onboard', proxyController.verifyToken, userController.onboardApi);
app.get('/user/onboard/check', proxyController.verifyToken, userController.checkOnboardApi);
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

