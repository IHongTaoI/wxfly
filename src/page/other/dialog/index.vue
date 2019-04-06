<template>
  <div id="dialog" class="paddingTopNav">
    <van-nav-bar
      :title="username"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
    <ul class="conte">
      <li
        v-for="(item, index) in msgInfo"
        :key="index"
        class="itemBox"
        :class="{isMe: item.userid === meUid}"
      >
        <img class="userava" :src="userAva(item)">
        <p class="text">{{item.text}}</p>
      </li>
    </ul>
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
  beforeRouteLeave(to, from, next) {
    this.$store.commit("message/setSeesionId", -1);
    next();
  },
  data() {
    return {
      username: this.$route.params.username,
      userId: this.$route.params.userId,
      userAvatar: this.$route.params.userava,
      meUid: this.$store.state.user.userId,
      conversationID: "",
      msg: ""
    };
  },
  methods: {
    async sendDialogMsg() {
      let sendData = {
        conversationID: this.conversationID,
        info: {
          ava: this.userAvatar,
          name: this.username
        },
        meId: this.meUid,
        toId: this.userId,
        msg: {
          text: this.msg,
          userid: this.meUid
        }
      };
      if (this.$store.state.isMock) {
        console.log(sendData, "sendData");
        this.$store.commit("message/updateMsg", sendData);
        this.msg = "";
        return;
      }
      let ret = await this.$apihelper.sendSocketMsg(
        "CHAT",
        {
          userId: this.userId,
          text: this.msg
        },
        this.conversationID
      );
      sendData = {
        conversationID: this.conversationID,
        info: {
          ava: this.userAvatar,
          name: this.username
        },
        meId: this.meUid,
        toId: this.userId,
        msg: {
          text: this.msg,
          userid: this.meUid
        }
      };
      this.$store.commit("message/updateMsg", sendData);
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
      this.$store.commit("message/setSeesionId", ChatId);
    },
    userAva(item) {
      if (item.userid === this.meUid) {
        return this.$store.state.user.userInfo.userAvatar;
      } else {
        return this.userAvatar;
      }
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
