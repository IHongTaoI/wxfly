export default [{
  path: '/',
  component: () => import('../page/wrap.vue'),
  children: [{
      path: '/',
      name: 'home',
      component: () => import('../page/home/index.vue'),
    }, {
      path: '/read',
      name: 'read',
      component: () => import('../page/read/index.vue'),
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../page/message/index.vue'),
    },
    {
      path: '/self',
      name: 'self',
      component: () => import('../page/self/index.vue'),
    }
  ]
}, {
  path: '/other/publish',
  name: 'publish',
  component: () => import('../page/other/publish.vue'),
}, {
  path: '/login',
  name: 'login',
  component: () => import('../page/other/login.vue'),
},{
  path: '/register',
  name: 'register',
  component: () => import('../page/other/register.vue'),
}]


