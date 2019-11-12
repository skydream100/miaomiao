import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 引入子状态 注册到这里 key 和 value都是一样的，就写一个了.
    city,
  }
})
