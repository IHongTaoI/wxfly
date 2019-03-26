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
    <div class="modify-text" v-if="type === 'nikename'">
      <van-field v-model="nikename" placeholder="请输入昵称"/>
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
      <vueCropper ref="cropper" :img="userAvatar" outputType="png"></vueCropper>
    </div>
  </div>
</template>
<script>
import areaData from "./../../../lib/area-data.js";
export default {
  data() {
    return {
      isloading: false,
      nikename: this.$store.state.user.userInfo.userName,
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
        nikename: "修改昵称",
        userAvatar: "取消",
        gender: "修改性别(只能修改一次)",
        addRess: "修改地址"
      }[type];
    }
  },
  methods: {
    submit() {},
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
}
</style>
