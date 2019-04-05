<template>
  <div id="dialog" class="paddingTopNav">
    <van-nav-bar
      :title="username"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
    <div class="conte">
      <p v-for="(item, index) in msgInfo" :key="index">{{item}}</p>
    </div>
    <div class="footer">
      <van-field v-model="msg"/>
      <van-button class="btn" type="info" @click="sendDialogMsg">发送</van-button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  created() {
    console.log(this.$route);
    this.setChatId();
  },
  data() {
    return {
      username: this.$route.params.username,
      userId: this.$route.params.userId,
      userAvatar: this.$route.params.userava,
      conversationID: "",
      msg: ""
    };
  },
  methods: {
    async sendDialogMsg() {
      let ret = await this.$apihelper.sendSocketMsg(
        "CHAT",
        {
          userId: this.userId,
          text: this.msg
        },
        this.conversationID
      );
      this.$store.commit("message/updateMsg", {
        conversationID: this.conversationID,
        fromUser: {
          id: this.userId,
          userName: this.username,
          userAvatar: this.userAvatar
        },
        msg: this.msg
      });
      this.msg = "";
    },
    async setChatId() {
      let msgChatIdMap = this.$utils.global.msgChatIdMap;
      let ChatId = msgChatIdMap.get(this.userId);
      if (!ChatId) {
        let ret = await this.$apihelper.setChatId(
          this.$store.state.user.userId,
          this.userId
        );
        msgChatIdMap.set(this.userId, ret.d.conversationID);
        ChatId = ret.d.conversationID;
      }
      this.conversationID = ChatId;
    }
  },
  computed: {
    ...mapState("message", ["dialogList"]),
    msgInfo() {
      let msginfo = this.dialogList.find(v => {
        return v.conversationID === this.conversationID;
      });
      if (msginfo) {
        return msginfo.msgList || [];
      }
      return [];
    }
  }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
