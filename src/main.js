// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Test from './components/test'
import store from './store/index.js'
import Mock from './mock'
import 'font-awesome/css/font-awesome.min.css'

Mock.bootstrap()
Vue.use(ElementUI)
Vue.use(Router)
Vue.use(Test)
Vue.config.productionTip = false

const router = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes
})
// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/') {
//     sessionStorage.removeItem('user')
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'))
//   if (!user && to.path != '/') {
//     next({ path: '/' })
//   } else {
//     next()
//   }
// })
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
