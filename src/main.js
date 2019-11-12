import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
// 将axios对象放入Vue的原型对象中
Vue.prototype.axios = axios;

// 定义全局组件 先引入再全局注册一下
Vue.filter('setWH',(url,arg) => {
  return url.replace(/w\.h/,arg);
});

import Scroller from '@/components/Scroller'
// 将Scroller普通对象，重新封装为全局组件
Vue.component('Scroller', Scroller);

import Loading from '@/components/Loading'
/*
使用Vue.component()方法注册全局组件。
第一个参数是自定义元素名称，也就是将来在别的组件中使用这个组件的标签名称。
第二个参数是将要注册的Vue组件。
*/
Vue.component('Loading', Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
