<template>
  <div class="replay-list">
    <h3 class="rep-w-h">评论</h3>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="re-item" v-for="reItem in replyList" :key="reItem.id">
        <div class="re-wrap">
          <div class="left">
            <img :src="reItem.userAvatar" class="ava">
          </div>
          <div class="content">
            <div class="re-h">
              <span class="uname">{{reItem.userName}}</span>
            </div>
            <div class="recont">{{reItem.content}}</div>
            <div class="rechild" v-if="reItem.replies.length">
              <p class="rechild-item" v-for="(reChild, recind) in reItem.replies" :key="recind">
                <span>
                  <span class="color_user">{{reChild.userName}}</span> 回复
                  <span class="color_user">{{reChild.repltUserName}}</span>
                  : {{reChild.content}}
                </span>
              </p>
              <p v-if="reItem.replyCount > 2" class="more">共{{reItem.replyCount}}条回复&gt;&gt;</p>
            </div>
            <div class="bottom">
              <span class="time">{{reItem.replyTime}}</span>
              <span class="btn" @click="showReplyBox(reItem)">回复</span>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  props: ["shareId"],
  created() {
    this.shareReplyAll(this.shareId);
  },
  data() {
    return {
      sendObj: null,
      loading: false,
      finished: false,
      page: 0,
      pageSize: 20,
      replyList: []
    };
  },
  methods: {
    // 设置发送参数
    setSendObj(arvg) {
      this.sendObj = {
        commentId: arvg.id,
        shareId: this.shareId,
        uname: this.$store.state.user.userInfo.nickName,
        uavatar: this.$store.state.user.userInfo.avatarUrl,
        replyUserId: arvg.userId,
        replyUserName: arvg.userName,
        replyUserAvatar: arvg.userAvatar
      };
    },
    onLoad() {
      this.shareReplyAll();
    },
    async shareReplyAll(shareId) {
      let ret = await this.$utils.apiHelper.shareReplyAll({
        shareId,
        page: this.page,
        pageSize: this.pageSize
      });
      for (let v of ret.d.replies) {
        v.replyTime = this.$utils.dateFromat(v.replyTime);
      }
      if (ret.d.replies.length < this.pageSize) {
        this.finished = true;
      }
      this.loading = false;
      this.replyList.push(...ret.d.replies);
    },
    showReplyBox(reItem) {
      this.setSendObj(reItem);
      this.$emit("btnClick", reItem);
    }
  }
};
</script>

<style lang="less" scoped>
.replay-list {
  .rep-w-h {
    font-weight: 600;
    font-size: 22px;
    line-height: 60px;
  }
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
          }
        }
        .recont {
          font-size: 18px;
        }
        .rechild {
          background: #f7f7f7;
          font-size: 14px;
          padding: 4px;
          border-radius: 6px;
          .rechild-item {
            .color_user {
              color: #4777ac;
            }
          }
          .more {
            color: #4777ac;
          }
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
}
</style>
