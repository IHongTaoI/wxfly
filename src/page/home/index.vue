<template>
  <div id="home" ref="main">
    <div class="tabs">
      <van-tabs v-model="active" @click="tabsClick">
        <van-tab title="附近"></van-tab>
        <van-tab title="最新"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="diseRefresh || noCanGetNearby"
      class="refreshBox"
    >
      <p v-show="noCanGetNearby" class="noCanGetNearby">
        抱歉未能获取您的位置信息
        <br>
        <span style="color: blue;" @click="GetNearby">重新获取</span>
      </p>
      <auto-virtual-list
        ref="scrollBox"
        style="width: 100%;height: 100%;padding-bottom: 60px;"
        @tobottom="onLoad"
        @onscroll="onscroll"
        v-if="!noCanGetNearby"
      >
        <shreaBox
          :itemObj="item"
          :index="index"
          :type="type"
          v-for="(item, index) in list"
          :key="item.id"
          :style="{height: item.height}"
          @action="actionHandler"
        ></shreaBox>
        <loadinganite v-show="loading && !noCanGetNearby"></loadinganite>
        <p v-show="finished && list.length" class="no-more">-------我也是有底线的-------</p>
        <p v-show="finished && !list.length" class="no-more">-------列表空空如也-------</p>
      </auto-virtual-list>
    </van-pull-refresh>
    <van-actionsheet
      v-model="showActionsheetL"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
    <div class="go-top" v-show="showGotoTop">
      <span class="iconfont icon-dingbu" @click="gotoTop"></span>
    </div>
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
    this.type = this.$utils.cache["homeType"] || "newest";
    let actindex = this.$utils.cache["homeActive"];
    if (!this.$utils.isNull(actindex)) this.active = actindex;
    this.$nextTick(() => {
      this.setScrollT();
      document.querySelector(".van-pull-refresh__track").style.height = "100%";
    });
    if (!this.list.length || this.$route.params.reload) {
      this.getList(true);
    }
  },
  deactivated() {
    this.$utils.cache["homeType"] = this.type;
    this.$refs.main.onscroll = null;
  },
  data() {
    return {
      selObj: null, // 正在操作的数据
      showActionsheetL: false,
      isLoading: false, // 是否在下拉刷新
      isreload: false,
      diseRefresh: true, // 是否禁用下拉刷新
      type: "newest",
      showGotoTop: true, // 是否显示去顶部
      active: 1,
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
    ...mapActions("listHelper", ["getlistHelper"]),
    onLoad() {
      if (this.finished) return;
      if (this.loading) return;
      this.loading = true;
      this.list.length && this.getList(false);
    },
    tabsClick(index) {
      this.$utils.cache["homeActive"] = index;
    },
    onscroll(e, { offset }) {
      if (offset < 10) {
        this.diseRefresh = false;
        this.showGotoTop = false;
      } else {
        this.showGotoTop = true;
        this.diseRefresh = true;
      }
      this.$utils.cache[this.type + "scroll"] = offset;
    },
    onRefresh() {
      this.getList(true);
    },
    // 去顶部
    gotoTop() {
      this.setScrollT(0);
    },
    getList(isreload = true) {
      this.getlistHelper({
        isreload,
        type: this.type,
        cb: () => {
          this.isLoading = false;
          this.loading = false;
          this.setScrollT();
        }
      });
    },
    actionHandler(selObj) {
      this.selObj = selObj;
      this.showActionsheetL = true;
    },
    // 设置滚动高度
    setScrollT(val) {
      this.$nextTick(() => {
        let target;
        if (this.$utils.isNull(val)) {
          target = this.$utils.cache[this.type + "scroll"];
        } else {
          target = val;
        }
        if (this.$refs.scrollBox) {
          this.$refs.scrollBox.$el.scrollTop = target;
        }
      });
    },
    async onSelect(msg, item) {
      if (msg.type === 2) {
        // 收藏
        let ret = await this.$apihelper.userCollect(this.selObj.id);
        if (ret) this.$toast.success("收藏成功");
      }
      this.showActionsheetL = false;
    },
    // 获取地理位置
    async GetNearby() {
      let ret = await this.$BMap.getPosition();
      if (!ret) this.$toast("获取地理位置失败");
      this.getList(true);
    }
  },
  watch: {
    active(cur) {
      if (cur === 1) {
        // 最新
        this.type = "newest";
        !this.list.length && this.getList();
      }
      if (cur === 0) {
        // 附近
        this.type = "nearby";
        !this.list.length && this.hasLatLng && this.getList();
      }
      this.setScrollT();
    }
  },
  computed: {
    ...mapState("listHelper", ["newest", "nearby", "dynamic"]),
    ...mapState("user", ["lat", "lng", "hasLatLng"]),
    list() {
      let type = this.type;
      if (type === "newest") return this.newest.list;
      if (type === "nearby") return this.nearby.list;
      if (type === "dynamic") return this.dynamic.list;
    },
    // 是否能获取附近的分享
    noCanGetNearby() {
      // 有地理位置就能
      return !this.hasLatLng && this.type === "nearby";
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
  .noCanGetNearby {
    font-size: 18px;
    text-align: center;
    line-height: 40px;
  }
  .go-top {
    position: absolute;
    bottom: 65px;
    right: 12px;
    .iconfont {
      font-size: 50px;
      color: rgba(254, 90, 96, 0.7);
    }
  }
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
