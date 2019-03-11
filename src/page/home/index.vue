<template>
  <div id="home" ref="main">
    <div class="tabs">
      <van-tabs v-model="active">
        <van-tab title="附近"></van-tab>
        <van-tab title="最新"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refreshBox">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <DynamicScroller :items="list" :min-item-size="54" class="scroller">
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem :item="item" :active="active">
              <shreaBox :itemObj="item" :index="index" :type="type" @action="actionHandler"></shreaBox>
              <div class="splitBlock"></div>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </van-list>
    </van-pull-refresh>
    <van-actionsheet
      v-model="showActionsheetL"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
  </div>
</template>
<script>
import shreaBox from "./child/shraeList";
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  components: {
    shreaBox
  },
  activated() {
    // 保存滚动高度，暂时没有什么好的办法
    let _this = this;
    this.setScrollT();
    this.$refs.main.onscroll = function() {
      _this.$utils.cache[_this.type + "scroll"] = parseInt(this.scrollTop);
    };
    if (this.$route.params.reload) {
      this.getList(true);
    }
  },
  deactivated() {
    this.$refs.main.onscroll = null;
  },
  data() {
    return {
      selObj: null, // 正在操作的数据
      showActionsheetL: false,
      type: "newest",
      active: 1,
      page: 0,
      pageSize: 10,
      loading: false,
      isLoading: false,
      actions: [
        {
          name: "收藏",
          type: 2
        }
      ]
    };
  },
  methods: {
    ...mapActions("homeList", ["getHomeList"]),
    onLoad() {
      this.getList();
    },
    onRefresh() {
      this.getList(true);
    },
    getList(isreload) {
      this.getHomeList({
        isreload,
        type: this.type,
        cb: () => {
          this.isLoading = false;
          this.loading = false;
        }
      });
    },
    actionHandler(selObj) {
      this.selObj = selObj;
      this.showActionsheetL = true;
    },
    setScrollT() {
      this.$nextTick(() => {
        this.$refs.main.scrollTop = this.$utils.cache[this.type + "scroll"];
        console.log(this.$utils.cache);
      });
    },
    async onSelect(msg, item) {
      if (msg.type === 2) {
        // 收藏
        let ret = await this.$apihelper.userCollect(this.selObj.id);
        if (ret) this.$toast.success("收藏成功");
      }
      this.showActionsheetL = false;
    }
  },
  watch: {
    active(cur) {
      if (cur === 1) {
        this.type = "newest";
        !this.list.length && this.getList();
      }
      if (cur === 0) {
        this.type = "nearby";
        !this.list.length && this.getList();
      }
      this.setScrollT();
    }
  },
  computed: {
    ...mapState("homeList", ["newest", "nearby", "dynamic"]),
    list() {
      let type = this.type;
      if (type === "newest") return this.newest.list;
      if (type === "nearby") return this.nearby.list;
      if (type === "dynamic") return this.dynamic.list;
    },
    finished() {
      let type = this.type;
      if (type === "newest") return this.newest.finished;
      if (type === "nearby") return this.nearby.finished;
      if (type === "dynamic") return this.dynamic.finished;
    }
  }
};
</script>
<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  padding-top: 44px;
  padding-bottom: 100px;
  overflow-y: auto;
  .tabs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    z-index: 3;
  }
}
</style>
