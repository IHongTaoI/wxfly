<template>
  <div id="shard-detail">
    <van-nav-bar title="详情页" left-text="返回" left-arrow @click-left="onClickLeft" class="topNavBar">
      <span slot="right" v-show="isMe" class="iconfont icon-shanchu" @click="deleteMyShrea"></span>
    </van-nav-bar>
    <div class="wrap" v-if="shardData">
      <div class="header">
        <div class="info">
          <img class="userava" :src="shardData.shareUserAvatar">
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
          <p class="txt">{{shardData.shareReplyCount}}</p>
        </div>
        <div class="action-item">
          <p class="iconfont icon-zhuanfa"></p>
          <p class="txt">{{shardData.shareTransmitCount}}</p>
        </div>
      </div>
      <div class="replay-list">
        <h3 class="rep-w-h">评论</h3>
        <replyList
          :reItem="item"
          @btnClick="replyChildBtn"
          :index="index"
          v-for="(item, index) in replyList"
          :key="index"
        ></replyList>
        <p
          class="more-replay"
          v-show="replyList.length && replyList.length >= 5"
          @click.stop="showMoreReplay"
        >查看更多评论</p>
        <p class="no-more" v-show="replyList.length && replyList.length < 5">暂无更多评论</p>
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
      replyList: [],
      cIndex: -1,
      pIndex: -1
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 查看更多评论
    showMoreReplay() {
      this.$router.push({
        name: "moreReplay",
        query: {
          shareId: this.shareId
        }
      });
    },
    async getDetil() {
      let ret = await this.$apihelper.getShardDetail(this.shareId);
      if (!ret) return;
      this.loading = false;
      ret.d.share.createTime = this.$utils.dateFromat(ret.d.share.createTime);
      ret.d.share.shareImg = ret.d.share.shareImg.split(",");
      for (let v of ret.d.replies) {
        v.replyTime = this.$utils.dateFromat(v.replyTime);
      }
      this.shardData = ret.d.share;
      // 获取回复
      this.replyList = ret.d.replies || [];
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
    replyChildBtn(obj) {
      let { item, pIndex, cIndex } = obj;
      this.cIndex = cIndex;
      this.pIndex = pIndex;
      this.isReplayChild = true;
      this.tearPlaTxt = `回复${item.userName}`;
      this.showReplyBox = true;
      this.cacheObj = {
        commentId: item.id,
        shareId: this.shareId,
        replyUserId: item.userId
      };
    },
    async sumbitReplay(replyCont) {
      this.cacheObj.content = replyCont;
      if (this.isReplayChild) {
        // 二级评论
        let ret = await this.$apihelper.shareReplyArticleChild(this.cacheObj);
        console.log("回复二级评论", ret);
        // 如果回复的是二级回复的子回复
        let pReplies = this.replyList[this.pIndex];
        let cReplies = this.replyList[this.pIndex].replies;
        if (cReplies && cReplies.length >= 2) {
          pReplies.replyCount += 1;
        } else {
          ret.d.repltUserName = this.replyList[this.pIndex].userName;
          ret.d.replyTime = this.$utils.dateFromat(ret.d.replyTime);
          ret.d.userName = this.$store.state.user.userInfo.userName;
          ret.d.replies = [];
          cReplies.push(ret.d);
        }
        this.hidereplyBox();
        // this.getDetil();
      } else {
        let ret = await this.$apihelper.shareReplyArticle(this.cacheObj);
        console.log("回复楼主", ret);
        ret.d.replyTime = this.$utils.dateFromat(ret.d.replyTime);
        ret.d.userAvatar = this.$store.state.user.userInfo.userAvatar;
        ret.d.userName = this.$store.state.user.userInfo.userName;
        this.replyList.push(ret.d);
        this.hidereplyBox();
        // this.getDetil();
      }
    },
    // 删除我的分享
    deleteMyShrea() {
      this.$dialog.alert({
        message: "确定删除吗",
        showCancelButton: true,
        callback: async msg => {
          if (msg === "confirm") {
            // 确定删除
            let ret = await this.$apihelper.delectShare(this.shardData.id);
            if (!ret) return;
            this.$router.replace({
              name: "home",
              params: {
                reload: true
              }
            });
          }
        }
      });
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
  computed: {
    // 是否是我发布的分享
    isMe() {
      return (
        this.shardData &&
        this.shardData.shareUserId === this.$store.state.user.userId
      );
    }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  }
};
</script>
<style lang="less" scoped>
.animated {
  animation-duration: 0.5s;
}
.icon-shanchu {
  color: #d81e06;
}
#shard-detail {
  position: relative;
  padding: 46px 4px 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  .wrap {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 6px 10px;
    padding-bottom: 50px;
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
    .no-more {
      font-size: 16px;
      padding: 5px 0 20px;
      line-height: 70px;
      text-align: center;
      color: #ccc;
    }
  }
}
</style>
