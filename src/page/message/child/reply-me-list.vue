<template>
  <div class="reply-me-list paddingTopNav" ref="reMeBox">
    <van-nav-bar
      title="所有回复"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
    <div class="list-box">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refreshBox">
        <van-list
          v-model="loading"
          :finished="replyMeList.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <div class="item" v-for="(item, index) in replyMeList.list" :key="index">
            <div class="header">
              <img :src="item.user.userAvatar" class="ava">
              <h3 class="userinfo">
                <p class="name">{{item.user.userName}}</p>
                <p class="item">{{item.comment.replyTime}}</p>
              </h3>
            </div>
            <div class="contBox">
              <div class="cont">
                <p class="des botline" v-if="item.child">{{item.comment.replies.content}}</p>
                <p class="des">{{item | commentFliter1}}</p>
              </div>
              <div class="share" @click="gotoDetail(item.share.id)">
                <div class="img-box" v-if="item.share.shareImg[0]">
                  <img :src="item.share.shareImg[0]">
                </div>
                <p class="txt">{{item.user.userName}} : {{item.share.shareContent}}</p>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  created() {
    !this.replyMeList.list.length && this.getList();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.reMeBox.scrollTop = this.$utils.cache.reMeListScroll;
      let _this = this;
      this.$refs.reMeBox.onscroll = function() {
        _this.$utils.cache.reMeListScroll = parseInt(this.scrollTop);
      };
    });
  },
  filters: {
    commentFliter1(v) {
      if (v.child) {
        // 二级回复
        return `@某某人 : ${v.comment.content}`;
      } else {
        return `@我 : ${v.comment.content}`;
      }
    }
  },
  data() {
    return {
      loading: false,
      isLoading: false
    };
  },
  methods: {
    onLoad() {
      this.getList(false);
    },
    onRefresh() {
      this.getList(true);
    },
    gotoDetail(id) {
      this.$router.push({
        path: "/home/shardDetail",
        query: {
          id
        }
      });
    },
    async getList(isreload = true) {
      this.$store.dispatch("listHelper/replyMeList", {
        isreload,
        cb: () => {
          this.loading = false;
          this.isLoading = false;
          console.log("xialashuaxin");
        }
      });
    }
  },
  computed: {
    ...mapState("listHelper", ["replyMeList"])
  }
};
</script>

<style lang="less" scoped>
@import "./less/reply-me-list.less";
</style>
