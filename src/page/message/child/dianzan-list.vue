<template>
  <div class="dianzan-list paddingTopNav">
    <van-nav-bar
      title="赞"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
    <ul class="wrap">
      <li v-for="(item, i) in list" :key="i">
        {{item.user.userName}}给你点赞了
      </li>
    </ul>
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
      pageSize: 20,
      list: []
    };
  },
  methods: {
    async getList() {
      let ret = await this.$apihelper.getLikeMeLogs({
        page: this.page + "",
        pageSize: this.pageSize + ""
      });
      if (!ret) return;
      this.list = ret.d.parseList
    }
  }
};
</script>

<style lang="less" scoped>
@import "./less/dianzan-list.less";
</style>
