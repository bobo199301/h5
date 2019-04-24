import Vue from 'vue'
import Router from 'vue-router'
import main from '../main/Main'
Vue.use(Router)

const router = new Router({mode: 'history', routes: [{path: '/', name: '首页', component: main}]})

export default router
