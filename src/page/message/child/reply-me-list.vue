<template>
  <div class="reply-me-list paddingTopNav">
    <van-nav-bar
      title="所有回复"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
  </div>
</template>
<script>
import GLOBAL from "@/utils/global-const.js";
export default {
  created() {
    this.getList();
  },
  data() {
    return {
      page: GLOBAL.PAGE,
      pageSize: 20
    };
  },
  methods: {
    async getList() {
      let ret = await this.$apihelper.getReplyMeList({
        page: this.page + "",
        pageSize: this.pageSize + ""
      });
      if (!ret) return;
      console.log(ret);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./less/reply-me-list.less";
</style>
