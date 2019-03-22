<template>
  <div class="my-collection-wrap paddingTopNav">
    <van-nav-bar
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
    <auto-virtual-list ref="scrollBox" style="width: 100%;height: 100%;" @tobottom="onLoad">
      <clectItem
        @click.native="gotoDetail(item.shareId)"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :style="{height: item.height}"
        @caozuo="caozuo"
      ></clectItem>
      <p class="nomore">{{finished ? '暂无更多' : '加载中...'}}</p>
    </auto-virtual-list>
    <van-actionsheet
      v-model="showActionsheetL"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
  </div>
</template>
<script>
import clectItem from "./my-clect-item.vue";

export default {
  created() {
    this.getList(false);
  },
  components: {
    clectItem
  },
  data() {
    return {
      list: [],
      showActionsheetL: false,
      loading: false,
      isLoading: false,
      finished: false,
      page: 0,
      pageSize: 30,
      cacheCollectId: -1,
      actions: [
        {
          name: "取消收藏"
        }
      ],
      caozuoIndex: -1 // 操作的数组索引
    };
  },
  methods: {
    onLoad() {
      if (this.loading || this.finished) return;
      console.log("底部");
      this.getList(false);
    },
    onRefresh() {
      this.getList();
    },
    caozuo(id, index) {
      this.caozuoIndex = index;
      this.cacheCollectId = id;
      this.showActionsheetL = true;
    },
    // 取消收藏
    async onSelect() {
      let ret = await this.$apihelper.delectCollection({
        collectId: this.cacheCollectId
      });
      if (!ret) return;
      this.list.splice(this.caozuoIndex, 1);
      this.$toast.success("取消收藏成功");
      this.showActionsheetL = false;
    },
    async getList(isreload = true) {
      this.loading = true;
      isreload && (this.page = 0);
      let ret = await this.$apihelper.getCollectionList({
        page: this.page,
        pageSize: this.pageSize
      });
      this.isLoading = false;
      if (!ret) return;
      this.page++;
      this.loading = false;
      let data = ret.d.collectList;
      if (data.length < this.pageSize) this.finished = true;
      for (let v of data) {
        let shareImg = [];
        if (v.shareImg) {
          v.height = "140px";
          shareImg = v.shareImg.split(",");
        } else {
          v.height = "95px";
        }
        v.createTime = this.$utils.dateFromat(v.createTime);
        v.shareImg = shareImg;
      }
      if (isreload) this.list = data;
      else this.list.push(...data);
    },
    gotoDetail(id) {
      this.$router.push({
        path: "/home/shardDetail",
        query: {
          id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my-collection-wrap {
  .scrollist {
    height: 100% !important;
  }
  .nomore {
    text-align: center;
    color: #ccc;
    line-height: 50px;
    font-size: 16px;
  }
}
</style>
