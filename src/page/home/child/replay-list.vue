<template>
  <div class="re-item">
    <div class="re-wrap">
      <div class="left">
        <img :src="reItem.userAvatar" class="ava">
      </div>
      <div class="content">
        <div class="re-h">
          <span class="uname">{{reItem.userName}}</span>
          <span class="iconfont icon-dianzan00" :class="{like: reItem.parse}" @click="likeClick">
            <i style="font-size: 12px;">{{reItem.praseCount}}</i>
          </span>
        </div>
        <div class="recont">
          <span v-if="isReplayOhter">
            回复
            <span class="color_user">{{reItem.repltUserName}}</span>
          </span>
          <span>{{reItem.content}}</span>
        </div>
        <div class="rechild" v-if="reItem.replies && reItem.replies.length">
          <p
            class="rechild-item"
            v-for="(reChild, recind) in reItem.replies"
            :key="recind"
            @click="showReplyBox({
              item: reChild,
              pIndex: index,
              cIndex: recind
            })"
          >
            <span>
              <span class="color_user">{{reChild.userName}}</span> 回复
              <span class="color_user">{{reChild.repltUserName}}</span>
              : {{reChild.content}}
            </span>
          </p>
          <p
            v-if="reItem.replyCount > 2"
            class="more"
            @click="gotoDetail(reItem)"
          >共{{reItem.replyCount}}条回复&gt;&gt;</p>
        </div>
        <div class="bottom">
          <span class="time">{{reItem.replyTime}}</span>
          <span
            class="btn"
            @click="showReplyBox({
            item: reItem,
            pIndex: index,
            cIndex: -1
          })"
          >回复</span>
        </div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: ["reItem", "goType", "pUserid", "index"],
  methods: {
    gotoDetail(item) {
      let name = "shardDetailReplay";
      if (this.goType === "mc") {
        name = "moreReplayChild";
      }
      this.$router.push({
        name,
        query: {
          shareId: item.shareId,
          replyId: item.id
        }
      });
    },
    likeClick() {
      this.$emit("likeClick", this.index);
    },
    showReplyBox(obj) {
      this.$emit("btnClick", obj);
    }
  },
  computed: {
    // 是否是回复别人
    // 如果没有传入pUserid，则显示的都是一级评论的样式，不显示回复谁谁谁
    isReplayOhter() {
      if (this.pUserid && this.reItem.replyUserId !== this.pUserid) {
        // 回复别人
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.color_user {
  color: #4777ac;
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
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        padding-top: 9px;
        .uname {
          font-size: 18px;
          color: #4d7caf;
        }
        .iconfont {
          color: #a6a6a6;
          &.like {
            color: crimson;
          }
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
</style>
