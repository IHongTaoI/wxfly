<template>
  <div id="home" ref="main">
    <div class="tabs">
      <van-tabs v-model="active">
        <van-tab title="附近"></van-tab>
        <van-tab title="最新"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="diseRefresh" class="refreshBox">
      <virtual-list
        ref="scrollBox"
        :size="250"
        :remain="6"
        class="scrollist"
        :tobottom="onLoad"
        :onscroll="onscroll"
      >
        <shreaBox
          :itemObj="item"
          :index="index"
          v-for="(item, index) in list"
          :key="item.id"
          @action="actionHandler"
        ></shreaBox>
        <loadinganite v-show="loading || !list.length"></loadinganite>
        <p v-show="finished" class="no-more">-------我也是有底线的-------</p>
      </virtual-list>
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
    this.$nextTick(()=>{
    this.setScrollT();
      document.querySelector('.van-pull-refresh__track').style.height = '100%';
    })
    if (!this.list.length || this.$route.params.reload) {
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
      isLoading: false, // 是否在下拉刷新
      isreload: false,
      diseRefresh: false, // 是否禁用下拉刷新 
      type: "newest",
      active: 1,
      page: 0,
      pageSize: 10,
      loading: false,
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
      if (this.finished) return;
      if (this.loading) return;
      this.loading = true;
      this.getList(false);
    },
    onscroll(e, { offset }) {
      if(offset < 10) this.diseRefresh = false
      else this.diseRefresh = true
      this.$utils.cache[this.type + "scroll"] = offset;
    },
    onRefresh() {
      this.getList(true);
    },
    getList(isreload = true) {
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
    // 设置滚动高度
    setScrollT() {
      this.$nextTick(() => {
        this.$refs.scrollBox.$el.scrollTop = this.$utils.cache[
          this.type + "scroll"
        ];
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
  overflow-y: auto;
  .refreshBox {
    height: 100%;
  }
  .scrollist {
    height: 100% !important;
    padding-bottom: 60px;
  }
  .no-more {
    text-align: center;
    line-height: 36px;
    margin-bottom: 30px;
    color: #ccc;
  }
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
