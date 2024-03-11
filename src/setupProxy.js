const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/notesposted.php',
    createProxyMiddleware({
      target: 'http://hyeumine.com',
      changeOrigin: true,
    })
  );
};
