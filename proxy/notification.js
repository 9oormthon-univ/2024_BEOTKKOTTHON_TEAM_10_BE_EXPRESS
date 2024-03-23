const models = require('../models');
const apn = require('apn');
const cron = require('node-cron');



// const apnProvider = new apn.Provider({
//     token: {
//         key: '../AuthKey_N7R2AY8J7S.p8', // 인증 키 경로
//         keyId: 'N7R2AY8J7S',
//         teamId: 'Q653PU93R6',
//     },
//     production: false // 개발용인지 아닌지 설정
// });

// function sendPushNotification() {
//     models.Userdevice.findAll()
//         .then(devices => {
//             devices.forEach(device => {
//                 userid = device.userid

//                 models.User.findOne({
//                     where: {
//                         userid: userid
//                     }
//                 })
//                     .then(findOneData => {
//                         if (findOneData) {
//                             username = findOneData.name;
//                             devicetoken = device.devicetoken;

//                             const notification = new apn.Notification({
//                                 alert: `${username}님 새로운 공고가 올라왔습니다.`,
//                                 sound: 'default',
//                                 badge: 1,
//                                 topic: 'WEDLE.CenApp'
//                             });

//                             apnProvider.send(notification, deviceToken).then(result => {
//                                 console.log(result);
//                             }).catch(error => {
//                                 console.error('Error sending push notification:', error);
//                             })
//                         }

//                     })



//             });
//         })



//     // const deviceToken = '80447a5d2e39593d678ca34c7db057fc8f960521c378400c691cc4fc12f57cc46820055fb15c4df4e4c0e081283e3d556d0cb3c5d924382cf542db2072fce393b9359822ae892dc507589f42439c45c4';



// }

// module.exports = { sendPushNotification };