const httpProxy = require('express-http-proxy');

function proxy(endPoint) {
  return httpProxy(process.env.SPRING_BACKEND_URL, {
    proxyReqPathResolver: () => endPoint,
    proxyErrorHandler: (err, res) => {
      console.error('Proxy Error:', err);
      res.status(500).send('Proxy Error');
    },
    userResDecorator: (_proxyRes, proxyResData) => {
      const data = JSON.parse(proxyResData.toString('utf8'));
      return JSON.stringify(data);
    },
  });
}

module.exports = { proxy };
