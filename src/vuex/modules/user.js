export default {
  namespaced: true,
  state: {
    islogin: false, // 是否登录
    token: '', // 请求用的token 155114907865244
    userId: '', // 请求头的userId  155082254078440
    userInfo: {
      // 用户信息
      country: '中国',
      province: '广东',
      city: '深圳',
      avatarUrl:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKuBsgNelD8zG3oIyEm9icHp8xyDW3WYaAtABUHT02mmnlq9CeWDicNl4686PeDicTjG5sImHE0iakAvw/132',
      openId: 'oMWA347ZHjlRQ1KOKtTSKYQMo_gU',
      nickName: '洪涛'
    }
  },
  mutations: {
    LOGIN_SUCCESS(state, msg) {
      state.islogin = true;
      state.token = msg.h.token;
      state.userId = msg.h.userId;
      let userInfo = msg.d.userInfo;
      // 需要每一个对象进行遍历
      for (let i in userInfo) {
        state.userInfo[i] = userInfo[i];
      }
    }
  },
  actions: {}
};
