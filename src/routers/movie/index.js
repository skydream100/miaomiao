export default {
  path: '/movie',
  // 组件按需载入,当切换到该路由的时候才会加载这个组件，如果不切换到该路由，是不会加载该组件
  component: () => import('@/views/Movie'), // @表示src这个目录
  children: [
    {
      path: 'city',
      component: () => import('@/components/City')
    },
    {
      path: 'nowPlaying',
      component: () => import('@/components/NowPlaying')
    },
    {
      path: 'comingSoon',
      component: () => import('@/components/ComingSoon')
    },
    {
      path: 'search',
      component: () => import('@/components/Search')
    },
    {
      path: 'detail/1/:movieId',
      components: {
        default : () => import('@/components/NowPlaying'),
        detail : () => import('@/views/Movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: 'detail/2/:movieId',
      components: {
        default : () => import('@/components/ComingSoon'),
        detail : () => import('@/views/Movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: '/movie/',
      redirect: '/movie/nowPlaying'
    }
  ]
}