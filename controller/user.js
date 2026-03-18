const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

const SALT_ROUNDS = 10;

const loginApi = async (req, res) => {
  try {
    const user = await models.User.findOne({ where: { userid: req.body.userid } });
    if (!user) {
      return res.status(401).json({ message: 'fail2' });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'fail1' });
    }
    const accessToken = jwt.sign(
      { name: user.name, userid: user.userid },
      process.env.JWT_SECRET,
      { expiresIn: '7d', issuer: 'About Tech' }
    );
    return res.status(200).json({ message: 'success', accesstoken: accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const signupApi = async (req, res) => {
  try {
    const existing = await models.User.findOne({ where: { userid: req.body.userid } });
    if (existing) {
      return res.json({ message: 'exist' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    await models.User.create({
      userid: req.body.userid,
      password: hashedPassword,
      name: req.body.name,
      onboard: false,
    });
    return res.json({ message: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'fail' });
  }
};

const changePasswordApi = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { userid: req.body.userid, name: req.body.name },
    });
    if (!user) {
      return res.status(200).json({ message: 'no user' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const [numRows] = await models.User.update(
      { password: hashedPassword },
      { where: { userid: req.body.userid, name: req.body.name } }
    );
    if (numRows === 1) {
      return res.json({ message: 'success' });
    }
    return res.status(400).json({ message: 'not updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const onboardApi = async (req, res) => {
  try {
    const user = await models.User.findOne({ where: { userid: req.headers.userid } });
    if (!user) {
      return res.status(400).json({ message: 'fail1' });
    }
    await user.update({
      ranking: req.body.ranking,
      grade: req.body.grade,
      region_city_province: req.body.region_city_province,
      region_city_country_district: req.body.region_city_country_district,
      major: req.body.major,
      onboard: true,
    });
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'fail2' });
  }
};

const checkOnboardApi = async (req, res) => {
  try {
    const user = await models.User.findOne({ where: { userid: req.headers.userid } });
    if (!user) {
      return res.status(400).json({ message: 'fail' });
    }
    return res.json({ message: user.onboard ? 'true' : 'false' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const checkLoginApi = (_req, res) => {
  return res.json({ message: 'login' });
};

const hashtagApi = async (req, res) => {
  try {
    const user = await models.User.findOne({ where: { userid: req.headers.userid } });
    if (!user) {
      return res.json({ message: 'fail' });
    }
    return res.json({
      ranking: user.ranking,
      grade: user.grade,
      region_city_province: user.region_city_province,
      region_city_country_district: user.region_city_country_district,
      major: user.major,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const userDeviceToken = async (req, res) => {
  try {
    const userid = req.headers.userid;
    const devicetoken = req.body.devicetoken;

    const existing = await models.Userdevice.findOne({ where: { userid } });
    if (existing) {
      const [numRows] = await models.Userdevice.update({ devicetoken }, { where: { userid } });
      if (numRows === 1) {
        return res.json({ message: 'success' });
      }
      return res.status(404).json({ message: 'same token' });
    }
    const token = await models.Userdevice.create({ userid, devicetoken });
    if (token) {
      return res.json({ message: 'success' });
    }
    return res.status(404).json({ message: 'fail' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  loginApi,
  signupApi,
  changePasswordApi,
  onboardApi,
  checkOnboardApi,
  checkLoginApi,
  hashtagApi,
  userDeviceToken,
};
