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
    page: 0,
    pageSize: 40,
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
    },
    loadDialogList(state, msg) {
      let { list, isload } = msg;
      isload && state.dialogList.splice(0);
      state.dialogList.push(...list);
      console.log('消息列表', list);
    }
  },
  actions: {
    // 初始化聊天列表
    async loadDialogList({ commit, state }, isload = false) {
      let ret = await this._vm.$apihelper.getChatList(
        state.page,
        state.pageSize
      );
      let arr = ret.d.conversations;
      arr = arr.map(v => {
        let isMe = v.userIdOne === this.state.user.userId;
        return {
          conversationID: v.conversationID,
          info: {
            ava: isMe ? v.userAvatarTwo : v.userAvatarOne,
            name: isMe ? v.userNameTwo : v.userNameOne
          },
          msgList: [],
          meId: isMe ? v.userIdOne : v.userIdTwo,
          toId: isMe ? v.userIdTwo : v.userIdOne
        };
      });
      commit('loadDialogList', {
        list: arr,
        isload
      });
    }
  }
};
