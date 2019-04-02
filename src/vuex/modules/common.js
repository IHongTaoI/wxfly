export default {
  namespaced: true,
  state: {
    redDot: {
      // 页面小红点逻辑
      self: false,
      downloadApp: false
    }
  },
  mutations: {
    INITREDDOT(state, msg) {
      for (let i in msg) {
        state.redDot[i] = msg[i];
      }
    }
  },
  actions: {
    // 初始化小红点
    initRedDot({ commit }) {
      let self = false,
        downloadApp = false;
      if (this.state.platform.isWeb && this.state.platform.isAndroid) {
        // 如果是web页面需要下载app所以显示小红点
        downloadApp = true;
      }
      if (downloadApp) self = true;
      commit('INITREDDOT', { self, downloadApp });
    }
  }
};
