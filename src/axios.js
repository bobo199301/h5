import axios from 'axios'

axios.interceptors.request.use(function (config) {
  config.timeout = 1000 & 20
  if (config.url.indexOf('wechat') === -1) {
    if (config.url.indexOf('model.json') === -1) {
      config.url = '/api/v2' + config.url
    }
  }
  return config
}, function (err) {
    if (err) {}
})
axios.interceptors.response.use(function (response){

  return Object.assign(response.data, {httpStatus: response.status})

}, function (error) {

  // 对响应错误做点什么
  return Promise.reject(error)
})
