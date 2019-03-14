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
              <p class="des">回复我:{{item.comment.content}}</p>
            </div>
            <div class="share" @click="gotoDetail(item.share.id)">
              <div class="img-box">
                <img :src="item.share.shareImg[0]" v-if="item.share.shareImg">
              </div>
              <p class="txt">我 : {{item.share.shareContent}}</p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import GLOBAL from "@/utils/global-const.js";
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
  data() {
    return {
      page: GLOBAL.PAGE,
      pageSize: 20,
      loading: false
    };
  },
  methods: {
    onLoad() {
      this.getList(false);
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
      this.$store.dispatch("homeList/replyMeList", {
        isreload,
        cd: () => {
          this.loading = false;
        }
      });
    }
  },
  computed: {
    ...mapState("homeList", ["replyMeList"])
  }
};
</script>

<style lang="less" scoped>
@import "./less/reply-me-list.less";
</style>
