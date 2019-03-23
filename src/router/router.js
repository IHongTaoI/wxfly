export default [
	{
		path: '/',
		redirect: '/home',
		name: 'homeWrap',
		component: () => import('../page/wrap.vue'),
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('../page/home/index.vue'),
			},
			{
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
			},
		],
	},
	{
		path: '/home/shardDetail',
		name: '分享详情',
		component: () => import('../page/home/child/shardDetail.vue'),
		children: [
			{
				path: 'replayDetail',
				name: 'shardDetailReplay',
				component: () => import('../page/home/child/replay-detail.vue'),
			},
			{
				path: 'moreReplay',
				name: 'moreReplay',
				component: () => import('../page/home/child/more-replay.vue'),
				children: [
					{
						path: 'replayDetail',
						name: 'moreReplayChild',
						component: () => import('../page/home/child/replay-detail.vue'),
					},
				],
			},
		],
	},
	{
		path: '/other/publish',
		name: 'publish',
		component: () => import('../page/other/publish.vue'),
	},
	{
		path: '/self/test',
		name: '测试页面',
		component: () => import('../page/self/child/test.vue'),
	},
	{
		path: '/message/dianzanlist',
		name: '点赞列表',
		component: () => import('../page/message/child/dianzan-list.vue'),
  },
  {
		path: '/message/replay-me-reply',
		name: '回复我的列表',
		component: () => import('../page/message/child/reply-me-list.vue'),
	},
	{
		path: '/self/userinfo',
		name: '个人详情',
		component: () => import('../page/self/child/userinfo.vue'),
		children: [
			{
				path: 'modify',
				name: 'userinfoModify',
				component: () => import('../page/self/child/modify-info.vue'),
			},
		],
	},
	{
		path: '/self/setting',
		name: '设置',
		component: () => import('../page/self/child/setting.vue'),
	},
	{
		path: '/self/collection',
		name: '收藏列表',
		component: () => import('../page/self/child/my-collection.vue'),
	},
	{
		path: '/self/dynamic',
		name: '动态',
		component: () => import('../page/self/child/my-dynamic.vue'),
	},
	{
		path: '/aboutMe',
		name: '关于我们',
		component: () => import('../page/self/child/about-me.vue'),
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
	},
	{
		path: '/test',
		name: 'test',
		component: () => import('../page/other/test.vue'),
	},
];
