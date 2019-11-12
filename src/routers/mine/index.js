export default {
  path: '/mine',
  // 组件按需载入,当切换到该路由的时候才会加载这个组件，如果不切换到该路由，是不会加载该组件
  component: () => import('@/views/Mine') // @表示src这个目录
}