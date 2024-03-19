const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const app = require("../server");

const loginApi = (req, res) => {
  const response_password = req.body.password;

  models.User.findOne({
    where: {
      userid: req.body.userid
    }
  })
    .then(foundData => {
      if (foundData) {
        bcrypt.compare(response_password, foundData.password, function (err, result) {
          if (err) throw err;
          if (result) {
            // req.session.user = result;
            // req.session.stdid = req.body.id;
            try {
              const accessToken = jwt.sign({
                name: foundData.name,
                userid: foundData.userid,
              }, "accesstoken", {
                expiresIn: '7d',
                issuer: "About Tech",
              });

              // res.cookie("accessToken", accessToken, {
              //   secure: false,
              //   httpOnly: true,
              // });
              //   res.setHeader('Authorization', 'Bearer ' + accessToken);

              return res.status(200).json({ message: 'success', accesstoken: accessToken });
            } catch (error) {
              console.log(error);
              return res.status(404).send(error);
            }

          }
          else {
            console.log('로그인 실패(비밀번호 불일치)');
            return res.status(401).json({ message: 'fail1' });
          }
        })
      }
      else {
        console.log('해당하는 id를 찾을 수 없습니다.');
        return res.status(401).json({ message: 'fail2' });
      }
    })
};

const testApi = (req, res) => {
  // console.log(req.headers);
  const data = {
    // message : `hi ${req.headers.username}`
    message: `hi choi`
  };
  res.json(data);
};

const signupApi = (req, res) => {
  models.User.findOne({
    where: {
      userid: req.body.userid
    }
  })
    .then(foundData => {
      if (foundData) { //아이디 있음
        console.log("원래 아이디 있음");
        return res.json({ message: "exist" })
      } else {
        console.log("원래 아이디 없음.");
        try {
          const password = req.body.password;
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, function (err, hashed_password) {
            models.User.create({
              userid: req.body.userid,
              password: hashed_password,
              name: req.body.name,
              onboard: false
            })
              .then(user => {
                // 유저 생성이 성공하면 success 메시지를 응답으로 보냄
                return res.json({ message: "success" });
              })
              .catch(error => {
                // 유저 생성 중 오류가 발생하면 fail 메시지를 응답으로 보냄
                console.error(error);
                return res.status(400).json({ message: "fail" });
              });
          })
        } catch (error) {
          // try 블록에서 오류 발생 시 catch 블록으로 이동하여 fail 메시지를 응답으로 보냄
          console.error(error);
          res.json({ message: "fail2" });
        }
      }
    })
};

const onboardApi = (req, res) => {
  models.User.findOne({
    where: {
      userid: req.headers.userid
    }
  })
    .then(foundData => {
      if (foundData) {
        foundData.update({
          ranking: req.body.ranking,
          grade: req.body.grade,
          region_city_province: req.body.region_city_province,
          region_city_country_district: req.body.region_city_country_district,
          major: req.body.major,
          onboard: true
        })
          .then(updatedData => {
            return res.status(200).json({ message: "success" });
          })
          .catch(error => {
            return res.status(404).json({ message: "fail2" }); //온보딩 실패
          })
      } else {
        return res.status(400).json({ message: "fail1" }); //유저 없음
      }
    })
}

const checkOnboardApi = (req, res) => {
  models.User.findOne({
    where: {
      userid: req.headers.userid
    }
  })
  .then(foundData => {
    if (foundData) {
      if (foundData.onboard) {
        return res.json({ message: "true" }); //온보딩 판별
      } else {
        return res.json({ message: "false" }); //온보딩 판별
      }
    } else {
      return res.json({ message: "fail" }); //해당하는 User 없음
    }
  })
}

const onboardHashtagApi = (req, res) => {
  models.User.findOne({
    where: {
      userid : req.headers.userid
    }
  })
  .then(foundData => {
    if(foundData){
      const data = {
        ranking: foundData.ranking,
        grade: foundData.grade,
        major : foundData.major,
        region_city_province: foundData.region_city_province,
        region_city_country_district: foundData.region_city_country_district
      }
      return res.json(data);
    }
  })
}

module.exports = {
  loginApi,
  testApi,
  signupApi,
  onboardApi,
  checkOnboardApi
}