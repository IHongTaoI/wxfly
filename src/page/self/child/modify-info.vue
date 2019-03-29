<template>
  <div :class="[{paddingTopNav: type !== 'addRess'}]">
    <van-nav-bar
      title
      left-arrow
      :left-text="title"
      @click-left="$router.go(-1)"
      class="topNavBar"
      v-show="type !== 'addRess'"
    >
      <van-button
        type="primary"
        slot="right"
        :loading="isloading"
        class="HBtn"
        @click.native="submit"
      >修改</van-button>
    </van-nav-bar>
    <div class="modify-text" v-if="type === 'userName'">
      <van-field v-model="userName" placeholder="请输入昵称"/>
    </div>
    <div class="gender" v-if="type === 'gender'">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = '0'">
            <van-radio name="0"/>
          </van-cell>
          <van-cell title="女" clickable @click="gender = '1'">
            <van-radio name="1"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="addr" v-if="type === 'addRess'">
      <van-area
        :area-list="addRess"
        cancel-button-text="返回"
        @change="adddChange"
        @cancel="$router.back()"
        @confirm="addrConfirm"
      />
    </div>
    <div class="userava" v-if="type === 'userAvatar'">
      <fileUpload class="usermodify" :proAva="userAvatar"></fileUpload>
      <p class="tips">点击头像更改</p>
    </div>
  </div>
</template>
<script>
import areaData from "./../../../lib/area-data.js";
import fileUpload from "./../../common/file-upload/file-upload.vue";
import { debug } from "util";

export default {
  components: {
    fileUpload
  },
  data() {
    return {
      isloading: false,
      userName: this.$store.state.user.userInfo.userName,
      gender: this.$store.state.user.userInfo.gender,
      userAvatar: this.$store.state.user.userInfo.userAvatar,
      type: this.$route.params.type,
      addRess: areaData
    };
  },
  computed: {
    title() {
      let type = this.$route.params.type;
      return {
        userName: "修改昵称",
        userAvatar: "取消",
        gender: "修改性别(只能修改一次)",
        addRess: "修改地址"
      }[type];
    }
  },
  methods: {
    async submit() {
      if (this.type === "userName") {
        if (this.userName.gblen() > 16) return this.$toast("名字太长拉");
      }
      let value = {
        userName: this.userName,
        gender: this.gender,
        addRess: "",
        avatar: "http://img.wuxfly.com/1552029040043447"
      }[this.type];
      let ret = await this.$apihelper.editUserInfo(this.type, value);
      this.$store.commit("user/UPDATE_USERDATA", ret.d);
      this.$toast("修改成功");
      setTimeout(() => {
        this.$router.back();
      }, 300);
    },
    adddChange(vm, index) {},
    addrConfirm(arr) {
      console.log(arr);
    }
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>
<style lang="less" scoped>
.HBtn {
  height: 30px;
  line-height: 26px;
  font-size: 14px;
}
.userava {
  width: 100%;
  height: 100%;
  padding-top: 24px;
  .usermodify {
    width: 100px;
    height: 100px;
    margin: 0 auto 6px;
  }
  .tips {
    text-align: center;
    color: skyblue;
  }
}
</style>
