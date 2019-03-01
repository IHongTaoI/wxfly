export default [{
  path: '/',
  name: 'home',
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
  name: 'home',
  component: () => import('../page/other/publish.vue'),
}]
