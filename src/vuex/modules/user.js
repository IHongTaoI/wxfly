export default {
  namespaced: true,
  state: {
    islogin: false, // 是否登录
    token: '155114907865244', // 请求用的token
    userId: '155082254078440', // 请求头的userId
    userInfo: {} // 用户信息
  },
  mutations: {
    LOGIN_SUCCESS(state, msg) {
      state.islogin = true
      state.token = msg.h.token
      state.userId = msg.h.userId
      let userInfo = msg.d.userInfo
      // 需要每一个对象进行遍历
      for (let i in userInfo) {
        state.userInfo[i] = userInfo[i]
      }
    }
  },
  actions: {}
}
