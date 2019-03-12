<template>
  <div class="more-replay">
    <div class="more-pos">
      <div class="more-wrap paddingTopNav">
        <van-nav-bar
          title="回复详情"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
          class="topNavBar"
        />
        <!-- 楼主 -->
        <div class="re-item">
          <div class="re-wrap">
            <div class="left">
              <img :src="replayParObj.userAvatar" class="ava">
            </div>
            <div class="content">
              <div class="re-h">
                <span class="uname">
                  <span class="txt">{{replayParObj.userName}}</span>
                  <strong class="icon">楼主</strong>
                </span>
              </div>
              <div class="recont">{{replayParObj.content}}</div>
              <div class="bottom">
                <span class="time">{{replayParObj.replyTime}}</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="line"></div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <replyList
            :reItem="item"
            v-for="(item, index) in reList"
            :key="index"
            :index="index"
            :pUserid="replayParObj.userId"
            goType="mc"
            @btnClick="replyChildBtn"
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
      replayParObj: {}, // 楼主的信息
      cIndex: -1,
      pIndex: -1
    };
  },
  methods: {
    async getList(isreload = true) {
      let { shareId, replyId } = this.$route.query;
      let ret = await this.$apihelper.getReplyDetail({
        shareId,
        replyId,
        page: this.page + "",
        pageSize: this.pageSize + ""
      });
      this.loading = false;
      if (!ret) return;
      // 请求成功
      this.page++;
      let list = ret.d.replies;
      ret.d.replyTime = this.$utils.dateFromat(ret.d.replyTime);
      this.replayParObj = ret.d;
      this.shareId = ret.d.shareId;
      this.tearPlaTxt = `回复${ret.d.userName}`;
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
    replyChildBtn(obj) {
      console.log(obj);
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
    // 隐藏回复框
    hidereplyBox() {
      this.showReplyBox = false;
      this.textareaBlur();
    },
    // 评论输入框失去焦点
    textareaBlur() {
      this.tearPlaTxt = `回复${this.replayParObj.userName}`;
    },
    async sumbitReplay(replyCont) {
      this.cacheObj.content = replyCont;
      // 二级评论
      let ret = await this.$apihelper.shareReplyArticleChild(this.cacheObj);
      console.log("回复二级评论", ret);
      ret.d.userAvatar = this.$store.state.user.userInfo.userAvatar;
      ret.d.replyTime = this.$utils.dateFromat(ret.d.replyTime);
      ret.d.userName = this.$store.state.user.userInfo.userName;
      ret.d.repltUserName = this.reList[this.pIndex].userName;
      this.reList.unshift(ret.d);
      this.hidereplyBox();
      // this.getList();
    },
    handlerClick(type) {
      return {
        replyBtn: () => {
          this.cacheObj = {
            commentId: this.replayParObj.id,
            shareId: this.shareId,
            replyUserId: this.replayParObj.userId
          };
          this.showReplyBox = true;
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
      .re-item {
        .re-wrap {
          display: flex;
          .left {
            width: 50px;
            padding-top: 10px;
            .ava {
              width: 38px;
              height: 38px;
              border-radius: 50%;
            }
          }
          .content {
            flex: 1;
            .re-h {
              line-height: 40px;
              padding-top: 9px;
              .uname {
                font-size: 18px;
                color: #4d7caf;
                .txt {
                  vertical-align: middle;
                }
                .icon {
                  background: #4d7caf;
                  color: #fff;
                  font-size: 12px;
                  padding: 3px 4px;
                  border-radius: 3px;
                  font-weight: 100;
                  vertical-align: middle;
                }
              }
            }
            .recont {
              font-size: 18px;
            }
            .bottom {
              padding: 10px 0;
              .time {
                color: #a6a6a6;
                font-size: 12px;
              }
              .btn {
                font-size: 12px;
                border: 1px solid #e5e5e5;
                padding: 5px 10px;
                border-radius: 20px;
                color: #737373;
                margin-left: 3px;
              }
            }
          }
        }
        .line {
          width: 100%;
          height: 1px;
          background: #f3f3f3;
          transform: scaleY(0.5);
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
    }
  }
}
</style>
