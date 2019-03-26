<template>
  <div class="paddingTopNav">
    <van-nav-bar title left-arrow :left-text="title" @click-left="$router.go(-1)" class="topNavBar">
      <van-button
        type="primary"
        slot="right"
        :loading="isloading"
        class="HBtn"
        @click.native="submit"
      >修改</van-button>
    </van-nav-bar>
    <div class="modify-text">
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isloading: false
    };
  },
  computed: {
    title() {
      let type = this.$route.params.type;
      if (type === "nikename") return "修改昵称";
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
</style>
