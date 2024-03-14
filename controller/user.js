const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const app = require("../server");

const loginApi =  (req, res) => {
  const response_password = req.body.password;

  models.Reuser.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(foundData => {
        if (foundData) {
          bcrypt.compare(response_password, foundData.password, function (err, result) {
            if (err) throw err;
            if (result) {
              console.log('login 성공');
              // req.session.user = result;
              // req.session.stdid = req.body.id;
              try {
                const accessToken = jwt.sign({
                  id: foundData.id,
                  username: foundData.username,
                }, "accesstoken", {
                  expiresIn: '1h',
                  issuer: "About Tech",
                });

                res.cookie("accessToken", accessToken, {
                  secure: false,
                  httpOnly: true,
                });
              //   res.setHeader('Authorization', 'Bearer ' + accessToken);
                return res.status(200).json({message: 'success'});
              } catch (error) {
                  console.log(error);
                return res.status(404).send(error);
              }
              
            }
            else {
              console.log('로그인 실패(비밀번호 불일치)');
              return res.status(401).json({message: 'fail1'});
            }
          })
        }
        else {
          console.log('해당하는 id를 찾을 수 없습니다.');
          return res.status(401).json({message: 'fail2'});
        }
      })
};

const hiApi = (req, res) => {
  console.log(req.headers);
  const data = {
      message : `hi ${req.headers.username}`
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
                      models.Reuser.create({
                          username: req.body.username,
                          password: hashed_password
                      })
                          .then(user => {
                              // 유저 생성이 성공하면 success 메시지를 응답으로 보냄
                              res.json({ message: "success" });
                          })
                          .catch(error => {
                              // 유저 생성 중 오류가 발생하면 fail 메시지를 응답으로 보냄
                              console.error(error);
                              res.json({ message: "fail1" });
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

module.exports = {
  loginApi,
  hiApi,
  signupApi
}