const apn = require('apn');
const models = require('../models');

const apnProvider = new apn.Provider({
  token: {
    key: process.env.APN_KEY_PATH,
    keyId: process.env.APN_KEY_ID,
    teamId: process.env.APN_TEAM_ID,
  },
  production: true,
});

async function sendPushNotification() {
  try {
    const scholarships = await models.Scholarship.findAll();
    const countRecord = await models.Count.findOne({ attributes: ['count'] });

    if (!scholarships || !countRecord || scholarships.length <= countRecord.count) return;

    await models.Count.update({ count: scholarships.length }, { where: { id: 1 } });

    const devices = await models.Userdevice.findAll();
    await Promise.all(
      devices.map(async (device) => {
        const user = await models.User.findOne({ where: { userid: device.userid } });
        if (!user) return;

        const notification = new apn.Notification({
          alert: `${user.name}님 새로운 공고가 올라왔습니다.`,
          sound: 'default',
          badge: 1,
          topic: process.env.APN_TOPIC,
        });

        try {
          const result = await apnProvider.send(notification, device.devicetoken);
          console.log(result);
        } catch (error) {
          console.error('Error sending push notification:', error);
        }
      })
    );
  } catch (error) {
    console.error('Error in sendPushNotification:', error);
  }
}

module.exports = { sendPushNotification };
