export default {
  namespaced: true,
  state: {
    dialogList: [],
    sessionId: -1
  },
  mutations: {
    updateMsg(state, msg) {
      let hasIndex = state.dialogList.findIndex(v => {
        return v.id === msg.id;
      });
      if (~hasIndex) {
        state.dialogList[hasIndex].msgList.push(msg.msg);
      } else {
        state.dialogList.push({
          userId: msg.fromUser.id,
          username: msg.fromUser.userName,
          userAvatar: msg.fromUser.userAvatar,
          msgList: [msg.msg]
        });
      }
    }
  },
  actions: {
    // 初始化小红点
  }
};
