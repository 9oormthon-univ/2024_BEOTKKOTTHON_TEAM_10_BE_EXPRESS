const httpProxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// function proxy(endPoint) {
//     console.log(endPoint);
//     return httpProxy(process.env.SPRING_BACKEND_URL, {
//         proxyReqPathResolver: function (req) {
//             // 클라이언트로부터 받은 요청 URL을 Spring 백엔드로 전달할 URL로 변환
//             return endPoint;
//           },
//           proxyErrorHandler: function (err, res, next) {
//             console.error('Proxy Error:', err);
//             res.status(500).send('Proxy Error');
//           },
//           userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
//             // Spring 백엔드로부터 받은 응답 데이터를 클라이언트에게 전달하기 전에 가공
//             let data = JSON.parse(proxyResData.toString('utf8'));  
//             // 응답 데이터 가공 작업
//             return JSON.stringify(data);
//           }
//     })
// }

function proxy(endPoint) {
  console.log(endPoint);
  return createProxyMiddleware({
      target: process.env.SPRING_BACKEND_URL,
      changeOrigin: true,
      pathRewrite: (path, req) => {
          // 요청 URL의 경로를 변경하여 endPoint로 요청을 보냄
          return endPoint;
      },
      onError: (err, req, res) => {
          console.error('Proxy Error:', err);
          res.status(500).send('Proxy Error');
      },
      onProxyRes: (proxyRes, req, res) => {
          // 프록시 응답을 변경할 필요가 있다면 여기에 추가 작업을 수행
      }
  });
}

function verifyToken(req, res, next) {
  // const token = req.cookies['accessToken']; // 'token_name'에는 실제 토큰이 저장된 쿠키 이름을 입력하세요

  const token = req.headers.accesstoken;
  // console.log(token);

  // if (!token) {
  //   return res.status(403).json({ message:'NoToken'});
  // } else {
  //   // 토큰 검증
  //   jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
  //     if (err) {
  //       res.clearCookie('accessToken', { path: '/', expires: new Date(0) });
  //       return res.status(401).json({ message: 'TokenFail' });
  //     } else {
  //       console.log(decoded.username);
  //       req.headers.username = decoded.username;
  //       next();
  //     }
  //   });
  // }
  if(!token){
    return res.status(403).json({ message:'NoToken'});
  } else {
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        // res.clearCookie('accessToken', { path: '/', expires: new Date(0) });
        return res.status(401).json({ message: 'TokenFail' });
      } else {
        req.headers.userid = decoded.userid;
        next();
      }
    });
  }

    // 요청에서 추출된 정보 활용 (예: 유저 아이디)
    
}




module.exports = {proxy, verifyToken};