<template>
  <div class="replay-detail">
    <van-nav-bar
      title="回复详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="topNavBar"
    />
  </div>
</template>
<script>
export default {
  created() {
    this.getList();
  },
  data() {
    return {
      page: 0,
      pageSize: 20
    };
  },
  methods: {
    async getList(isreload = true) {
      let query = this.$route.query;
      let ret = await this.$utils.apiHelper.getReplyDetail({
        shareId: query.shareId,
        replyId: query.replyId,
        page: this.page + "",
        pageSize: this.pageSize + ""
      });
      if (!ret) return;
      console.log(ret.d);
    }
  }
};
</script>
<style lang="less" scoped>
.replay-detail {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
