// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false


//reset.css
import "./assets/css/reset.css"

//vuex 引入

import store from "./store"


//过滤器

import "./filters"


//公共组件
import components from "./components"


//路由 pages


//stylus 预处理器


//element-ui

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
