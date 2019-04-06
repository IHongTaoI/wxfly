<template>
  <div id="message" ref="warp">
    <van-list finished-text="没有更多了" :immediate-check="false" class="vantList">
      <list-item type="slot">
        <van-cell-group class="itemSys">
          <van-cell is-link to="/message/replay-me-reply" class="cell">
            <div slot="icon" class="icon pinglun">
              <span class="iconfont icon-pinglun"></span>
            </div>
            <div slot="title" class="title">评论</div>
          </van-cell>
        </van-cell-group>
      </list-item>
      <list-item type="slot">
        <van-cell-group class="itemSys">
          <van-cell is-link to="/message/dianzanlist" class="cell">
            <div slot="icon" class="icon dianzan">
              <span class="iconfont icon-dianzan00"></span>
            </div>
            <div slot="title" class="title">点赞</div>
          </van-cell>
        </van-cell-group>
      </list-item>
      <list-item type="slot" v-if="dialogList.length">
        <van-cell-group class="itemSys">
          <van-cell
            :to="{name: 'dialog',params: {username: item.info.name,userId: item.toId,userava: item.info.ava}}"
            class="cell usermsg"
            :label="item.msgList.length ? item.msgList[item.msgList.length - 1].text : ''"
            v-for="(item, index) in dialogList"
            :key="index"
          >
            <div slot="icon" class="icon ava">
              <img :src="item.info.ava" class="img">
            </div>
            <div slot="title">{{item.info.name}}</div>
          </van-cell>
        </van-cell-group>
      </list-item>
    </van-list>
  </div>
</template>
<script>
import { mapState } from "vuex";
import listItem from "./child/meg-list-item";
export default {
  components: {
    listItem
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.cache.messageScroll = this.$refs.warp.scrollTop;
    next();
  },
  activated() {
    this.$refs.warp.scrollTop = this.$utils.cache.messageScroll;
  },
  computed: {
    ...mapState("message", ["dialogList"])
  }
};
</script>
<style lang="less" scoped>
#message {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  .vantList {
    padding-bottom: 66px;
  }
  .scrollist {
    height: 100% !important;
  }
  .icon-pinglun,
  .icon-dianzan00 {
    font-size: 26px;
    color: #fff;
  }
  .itemSys {
    height: 100%;
    .cell {
      height: 100%;
      display: flex;
      align-items: center;
      &.usermsg {
        align-items: flex-start;
      }
      .ava {
        margin-right: 12px;
        .img {
          width: 43px;
          height: 43px;
          border-radius: 50%;
        }
      }
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        &.pinglun {
          background: #31b67d;
        }
        &.dianzan {
          background: #fd9f00;
        }
      }
      .title {
        padding-left: 12px;
        font-size: 18px;
      }
    }
  }
}
</style>
