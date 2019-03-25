<template>
  <div class="more-replay">
    <div class="more-pos">
      <div class="more-wrap paddingTopNav">
        <van-nav-bar
          title="评论列表"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
          class="topNavBar"
        />
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <replyList
            :reItem="item"
            v-for="(item, index) in reList"
            :key="index"
            :index="index"
            goType="mc"
            @btnClick="replyChildBtn"
            @likeClick="likeClick"
          ></replyList>
        </van-list>
        <replyEditBox v-model="showReplyBox" :tearPlaTxt="tearPlaTxt" @on-submit="sumbitReplay"></replyEditBox>
        <div class="action-list">
          <div class="edit" @click="handlerClick('replyBtn')">
            <span class="iconfont icon-bianji" style="font-size: 20px;"></span>
            <span>写评论</span>
          </div>
          <!-- <div class="action-item">
          <p class="iconfont iconfont icon-shoucang"></p>
          <p class="txt">收藏</p>
          </div>-->
          <div class="action-item">
            <p class="iconfont icon-xihuancon"></p>
            <p class="txt">1</p>
          </div>
          <div class="action-item">
            <p class="iconfont icon-pinglun"></p>
            <p class="txt">1</p>
          </div>
          <div class="action-item">
            <p class="iconfont icon-zhuanfa"></p>
            <p class="txt">1</p>
          </div>
        </div>
        <transition
          :enter-active-class="'animated fadeInRight'"
          :leave-active-class="'animated fadeOutRight'"
        >
          <router-view class="app-content" style="z-index: 99"></router-view>
        </transition>
      </div>
    </div>
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
      showReplyBox: false,
      finished: false,
      tearPlaTxt: "发表评论",
      page: 0,
      pageSize: 20,
      reList: [],
      cacheObj: {},
      isReplayChild: false,
      shareId: this.$route.query.shareId,
      cIndex: -1,
      pIndex: -1
    };
  },
  methods: {
    async getList(isreload = true) {
      let { shareId } = this.$route.query;
      let ret = await this.$apihelper.shareReplyAll({
        shareId,
        page: this.page,
        pageSize: this.pageSize
      });
      this.loading = false;
      if (!ret) return;
      this.page++;
      let list = ret.d.replies;
      if (list.length < this.pageSize) {
        this.finished = true;
      }
      for (let v of list) {
        v.replyTime = this.$utils.dateFromat(v.replyTime);
      }
      if (isreload) {
        this.page = 0;
        this.reList = list;
      } else {
        this.reList.push(...list);
      }
    },
    async likeClick(index) {
      if(this.reList[index].parse) return;
      this.reList[index].parse = true;
      this.reList[index].praseCount += 1;
      let commentId = this.reList[index].id,
        praseUserId = this.reList[index].userId;
      let ret = await this.$apihelper.parseLikeReplay({
        shareId: this.shareId,
        praseUserId,
        commentId,
        type: "A"
      });
    },
    replyChildBtn(obj) {
      let { item, pIndex, cIndex } = obj;
      this.cIndex = cIndex;
      this.pIndex = pIndex;
      this.isReplayChild = true;
      this.tearPlaTxt = `回复${item.userName}`;
      this.showReplyBox = true;
      this.cacheObj = {
        commentId: this.reList[pIndex].id,
        shareId: this.shareId,
        replyUserId: item.userId,
        replyId: item.id
      };
    },
    // 隐藏回复框
    hidereplyBox() {
      this.showReplyBox = false;
      this.textareaBlur();
    },
    // 评论输入框失去焦点
    textareaBlur() {
      this.isReplayChild = false;
      this.tearPlaTxt = "发表评论";
    },
    async sumbitReplay(replyCont) {
      this.cacheObj.content = replyCont;
      if (this.isReplayChild) {
        // 二级评论
        let ret = await this.$apihelper.shareReplyArticleChild(this.cacheObj);
        console.log("回复二级评论", ret);
        let pReplies = this.reList[this.pIndex];
        let cReplies = this.reList[this.pIndex].replies;
        if (cReplies.length >= 2) {
          pReplies.replyCount += 1;
        } else {
          ret.d.replyTime = this.$utils.dateFromat(ret.d.replyTime);
          ret.d.userName = this.$store.state.user.userInfo.userName;
          cReplies.push(ret.d);
        }
        this.hidereplyBox();
      } else {
        let ret = await this.$apihelper.shareReplyArticle(this.cacheObj);
        console.log("回复楼主", ret);
        ret.d.replyTime = this.$utils.dateFromat(ret.d.replyTime);
        ret.d.userAvatar = this.$store.state.user.userInfo.userAvatar;
        ret.d.userName = this.$store.state.user.userInfo.userName;
        this.reList.push(ret.d);
        this.hidereplyBox();
        // this.getDetil();
      }
    },
    handlerClick(type) {
      return {
        // 一级回复
        replyBtn: () => {
          this.showReplyBox = true;
          this.cacheObj = {
            shareId: this.shareId
          };
        }
      }[type]();
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
  .more-pos {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .more-wrap {
      background: #fff;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 50px;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      .action-list {
        position: fixed;
        width: 100%;
        height: 50px;
        bottom: 0;
        left: 0;
        background: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0 8px 22px #000;
        .action-item {
          text-align: center;
          flex: 1;
        }
        .edit {
          text-align: center;
          flex: 2;
          margin-left: 12px;
          background: #f1f3f6;
          border-radius: 12px;
          color: #8e8f91;
        }
        .iconfont {
          font-size: 28px;
          vertical-align: middle;
          color: #7d7d7d;
          height: 28px;
        }
        .txt {
          font-size: 12px;
          line-height: 28px;
          vertical-align: middle;
          color: #7d7d7d;
        }
      }
    }
  }
}
</style>
