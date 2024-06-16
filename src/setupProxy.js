const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/hooks/catch/6844401/3sjq5ou/',
    createProxyMiddleware({
      target: 'https://hooks.zapier.com',
      changeOrigin: true,
      pathRewrite: {
        '^/hooks/catch/6844401/3sjq5ou/': '/hooks/catch/6844401/3sjq5ou/'
      },
    })
  );
};
