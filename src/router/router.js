export default [{
    path: '/',
    redirect: '/home',
    name: 'homeWrap',
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
    path: '/self/userinfo',
    name: '个人详情',
    component: () => import('../page/self/child/userinfo.vue'),
  },
  {
    path: '/self/setting',
    name: '设置',
    component: () => import('../page/self/child/setting.vue'),
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
