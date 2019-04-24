var proxy = require("http-proxy-middleware");

module.exports = function (app) {

    var proxyurl = ''
    if (process.env.NODE_ENV == "development") {
        proxyurl = 'http://localhost:8888'
    } else {
        proxyurl = 'http://localhost:8888'
    }
    app.use('/api/v2', proxy({target: proxyurl, changeOrigin: true}))

}
