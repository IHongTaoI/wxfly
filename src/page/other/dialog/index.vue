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
  },
  data() {
    return {
      username: this.$route.params.username,
      userId: this.$route.params.userId,
      userAvatar: this.$route.params.userava,
      msg: ""
    };
  },
  methods: {
    async sendDialogMsg() {
      let ret = await this.$apihelper.sendSocketMsg("CHAT", {
        userId: this.userId,
        text: this.msg
      });
      this.$store.commit("message/updateMsg", {
        fromUser: {
          id: this.userId,
          userName: this.username,
          userAvatar: this.userAvatar
        },
        msg: this.msg
      });
      this.msg = "";
    }
  },
  computed: {
    ...mapState("message", ["dialogList"]),
    msgInfo() {
      let msginfo = this.dialogList.find(v => {
        return v.userId === this.userId;
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
