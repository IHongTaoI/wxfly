<template>
  <div id="shard-detail">
    <van-nav-bar title="详情页" left-text="返回" left-arrow @click-left="onClickLeft" class="topNavBar"/>
    <div class="wrap" v-if="shardData">
      <div class="header">
        <div class="info">
          <img
            class="userava"
            src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoCCQA6BUhL2kqReaa9Gt8oMmFmSD7PjthlFtsubSlS6wy0JnpxCp7pkficp1fZ3BzuiaTc6gicl56gA/132"
          >
          <div class="titles">
            <p class="username">{{shardData.shareUserName}}</p>
            <!--发布时间-->
            <p class="time">{{shardData.createTime}}</p>
          </div>
        </div>
      </div>
      <div class="conent">
        <p class="share-content">{{shardData.shareContent}}</p>
        <div class="imgs">
          <img
            class="img"
            :src="imgsrc"
            v-for="(imgsrc, index) in shardData.shareImg"
            :key="index"
            @click.stop="previewImage(shardData.shareImg, index)"
          >
        </div>
      </div>
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
      <div class="replay-list">
        <h3 class="rep-w-h">评论</h3>
        <replyList
          :reItem="item"
          @btnClick="replyChildBtn"
          v-for="(item, index) in replyList"
          :key="index"
        ></replyList>
        <p class="more-replay" v-show="replyList.length && replyList.length >= 10">查看更多评论</p>
        <p class="no-more" v-show="replyList.length && replyList.length < 10">暂无更多评论</p>
        <p class="no-more" v-show="!replyList.length">来做第一个沙发吧</p>
      </div>
      <!-- 评论列表 -->
    </div>
    <loadinganite v-if="loading"></loadinganite>
    <replyEditBox v-model="showReplyBox" :tearPlaTxt="tearPlaTxt" @on-submit="sumbitReplay"></replyEditBox>
    <transition
      :enter-active-class="'animated zoomInRight'"
      :leave-active-class="'animated zoomOutLeft'"
    >
      <router-view class="app-content" style="z-index: 99"></router-view>
    </transition>
  </div>
</template>
<script>
import loadinganite from "./loading-animate.vue";
import replyList from "./replay-list.vue";
import replyEditBox from "./reply-edit-box.vue";

export default {
  components: {
    loadinganite,
    replyList,
    replyEditBox
  },
  created() {
    this.shareId = this.$route.query.id;
    this.getDetil(this.shareId);
  },
  data() {
    return {
      loading: true,
      isReplayChild: false, // 是否是二级评论
      shardData: undefined,
      shareId: "",
      replyCont: "",
      showReplyBox: false,
      tearPlaTxt: "发表评论",
      cacheObj: null, // 缓存一些东西
      sendObj: null,
      replyList: []
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async shareReplyAll(shareId) {
      let ret = await this.$utils.apiHelper.shareReplyAll({
        shareId,
        page: 0,
        pageSize: 10
      });
      for (let v of ret.d.replies) {
        v.replyTime = this.$utils.dateFromat(v.replyTime);
      }
      this.replyList = ret.d.replies;
    },
    async getDetil() {
      let ret = await this.$utils.apiHelper.getShardDetail(this.shareId);
      if (!ret) return;
      this.shareReplyAll(this.shareId);
      ret.d.share.createTime = this.$utils.dateFromat(ret.d.share.createTime);
      ret.d.share.shareImg = ret.d.share.shareImg.split(",");
      this.shardData = ret.d.share;
    },
    previewImage(imgs, index) {
      this.$utils.imagePreview(imgs, index);
    },
    // 评论输入框失去焦点
    textareaBlur() {
      this.isReplayChild = false;
      this.tearPlaTxt = "发表评论";
    },
    // 隐藏回复框
    hidereplyBox() {
      this.showReplyBox = false;
      this.textareaBlur();
    },
    // 二级回复的按钮
    replyChildBtn(arvg) {
      this.isReplayChild = true;
      this.tearPlaTxt = `回复${arvg.userName}`;
      this.showReplyBox = true;
      this.cacheObj = {
        commentId: arvg.id,
        shareId: this.shareId,
        uname: this.$store.state.user.userInfo.nickName || "",
        uavatar:
          this.$store.state.user.userInfo.avatarUrl ||
          "http://img.hhooke.cn/wxfly/defualt-avar.png",
        replyUserId: arvg.userId,
        replyUserName: arvg.userName,
        replyUserAvatar: arvg.userAvatar
      };
    },
    async sumbitReplay(replyCont) {
      this.cacheObj.content = replyCont;
      if (this.isReplayChild) {
        // 二级评论
        let ret = await this.$utils.apiHelper.shareReplyArticleChild(
          this.cacheObj
        );
        console.log("回复二级评论", ret);
        this.hidereplyBox();
        this.getDetil();
      } else {
        let ret = await this.$utils.apiHelper.shareReplyArticle(this.cacheObj);
        console.log("回复楼主", ret);
        this.hidereplyBox();
        this.getDetil();
      }
    },
    handlerClick(type) {
      return {
        // 一级回复
        replyBtn: () => {
          this.showReplyBox = true;
          this.cacheObj = {
            shareId: this.shareId,
            uname: this.$store.state.user.userInfo.nickName,
            uavatar: this.$store.state.user.userInfo.avatarUrl
          };
        }
      }[type]();
    }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  }
};
</script>
<style lang="less" scoped>
.animated {
  animation-duration: 0.8s;
}
#shard-detail {
  padding: 46px 4px 50px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  .wrap {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 6px 10px;
    .header {
      display: flex;
      justify-content: space-between;
      .info {
        display: flex;
        justify-content: flex-start;
        .userava {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .titles {
          padding-left: 15px;
          .username {
            font-size: 16px;
          }
          .time {
            font-size: 16px;
            color: #bababa;
          }
        }
      }
    }
    .conent {
      .share-content {
        font-size: 18px;
        padding: 12px 0;
      }
      .imgs {
        .img {
          width: 100%;
          border-radius: 20px;
        }
      }
    }
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
      z-index: 98;
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
    .replay-list {
      .rep-w-h {
        font-weight: 600;
        font-size: 22px;
        line-height: 60px;
      }
    }
    .more-replay {
      font-size: 16px;
      padding: 12px 0;
      text-align: center;
      color: cornflowerblue;
    }
  }
}
</style>
