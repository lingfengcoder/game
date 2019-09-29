
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/game', {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: { '^/server': '' },
        // cookieDomainRewrite:{
        //     '*':'127.0.0.1' // 把相应的 cookie 域都设置成 localhost，或者指定的域名
        //     }
    }));
    //   app.use(proxy('/*.svg', { target: 'http://localhost:5000/' }));
};