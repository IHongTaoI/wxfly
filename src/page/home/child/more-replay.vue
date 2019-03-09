<template>
  <div class="more-replay paddingTopNav">
    <van-nav-bar
      title="评论列表"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="topNavBar"
    />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <replyList :reItem="item" v-for="(item, index) in reList" :key="index"></replyList>
    </van-list>
  </div>
</template>
<script>
import replyList from "./replay-list.vue";
import replyEditBox from "./reply-edit-box.vue";

export default {
  components: {
    replyList,
    replyEditBox
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 0,
      pageSize: 20,
      reList: []
    };
  },
  methods: {
    async getList(isreload = true) {
      let { shareId } = this.$route.query;
      let ret = await this.$utils.apiHelper.shareReplyAll({
        shareId,
        page: 0,
        pageSize: 10
      });
      this.loading = false;
      if (!ret) return;
      this.page++;
      let list = ret.d.replies;
      if (list.length < this.pageSize) {
        this.finished = true;
      }
      if (isreload) {
        this.reList = list;
      } else {
        this.reList.push(...list);
      }
    },
    onLoad() {
      this.getList(false);
    }
  }
};
</script>
<style lang="less" scoped>
.more-replay {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
