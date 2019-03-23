<template>
  <div class="dianzan-list paddingTopNav" ref="reMeBox">
    <van-nav-bar
      title="赞"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refreshBox">
      <van-list
        v-model="loading"
        :finished="dianzanList.finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div class="item" v-for="(item, i) in dianzanList.list" :key="i">
          <div class="box">
            <div class="l">
              <img :src="item.user.userAvatar" class="img">
              <span class="des">{{item | desFliter}}</span>
            </div>
            <div class="r" @click="gotoDetail(item)">
              <p v-if="item.isComment" class="cont">{{item.comment.content}}</p>
              <p v-else class="cont">{{item.share.shareContent}}</p>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  created() {
    !this.dianzanList.list.length && this.getList();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.reMeBox.scrollTop = this.$utils.cache.dianzanListScroll;
      let _this = this;
      this.$refs.reMeBox.onscroll = function() {
        _this.$utils.cache.dianzanListScroll = parseInt(this.scrollTop);
      };
    });
  },
  data() {
    return {
      loading: false,
      isLoading: false
    };
  },
  filters: {
    desFliter(v) {
      if (v.isComment) {
        return `${v.user.userName}攒了您的评论`;
      } else {
        return `${v.user.userName}攒了您的文章`;
      }
    }
  },
  methods: {
    async getList(isreload = true) {
      this.$store.dispatch("listHelper/dianzanList", {
        isreload,
        cb: () => {
          this.loading = false;
          this.isLoading = false;
        }
      });
    },
    gotoDetail(item) {
      this.$router.push({
        path: "/home/shardDetail",
        query: {
          id: item.share.id
        }
      });
    },
    onLoad() {
      this.getList(false);
    },
    onRefresh() {
      this.getList(true);
    }
  },
  computed: {
    ...mapState("listHelper", ["dianzanList"])
  }
};
</script>

<style lang="less" scoped>
@import "./less/dianzan-list.less";
</style>
