<template>
  <div class="dianzan-list paddingTopNav">
    <van-nav-bar
      title="赞"
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
      let ret = await this.$apihelper.getLikeMeLogs({
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
@import "./less/dianzan-list.less";
</style>
