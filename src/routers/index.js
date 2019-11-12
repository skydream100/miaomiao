import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie' // movie文件夹下的index.js可以省略不写
import mineRouter from './mine' // movie文件夹下的index.js可以省略不写
import cinemaRouter from './cinema' // movie文件夹下的index.js可以省略不写

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRouter,
    mineRouter,
    cinemaRouter,
    { path: '/*', redirect: '/movie', meta: { showTabBar: true }}
  ]
})
