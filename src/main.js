import Vue from 'vue'
import App from './App'
import './axios'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
