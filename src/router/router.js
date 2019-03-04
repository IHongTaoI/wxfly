export default [{
    path: '/',
    name: 'homeindex',
    redirect: '/home',
    component: () => import('../page/wrap.vue'),
    meta: {
      keepAlive: true
    },
    children: [{
        path: '/home',
        name: 'home',
        meta: {
          keepAlive: true
        },
        component: () => import('../page/home/index.vue'),
      },
      {
        path: '/read',
        name: 'read',
        meta: {
          keepAlive: true
        },
        component: () => import('../page/read/index.vue'),
      },
      {
        path: '/message',
        name: 'message',
        meta: {
          keepAlive: true
        },
        component: () => import('../page/message/index.vue'),
      },
      {
        path: '/self',
        name: 'self',
        meta: {
          keepAlive: true
        },
        component: () => import('../page/self/index.vue'),
      }
    ]
  },
  {
    path: '/home/shardDetail',
    name: '分享详情',
    component: () => import('../page/home/child/shardDetail.vue'),
  },
  {
    path: '/other/publish',
    name: 'publish',
    component: () => import('../page/other/publish.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../page/other/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../page/other/register.vue'),
  }
]
