function formatMsg(msg) {
  let { id, userName, userAvatar } = msg.fromUser;
  return {
    userId: id,
    username: userName,
    userAvatar: userAvatar,
    conversationID: msg.conversationID,
    msgList: [msg.msg]
  };
}

export default {
  namespaced: true,
  state: {
    dialogList: [],
    sessionId: -1
  },
  mutations: {
    updateMsg(state, msg) {
      let hasIndex = state.dialogList.findIndex(v => {
        return v.conversationID === msg.conversationID;
      });
      if (~hasIndex) {
        state.dialogList[hasIndex].msgList.push(msg.msg);
      } else {
        state.dialogList.push(formatMsg(msg));
      }
    }
  },
  actions: {
    // 初始化小红点
  }
};
