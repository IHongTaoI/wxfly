<template>
  <div id="message">
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
  </div>
</template>
<script>
import listItem from "./child/meg-list-item";
export default {
  components: {
    listItem
  }
};
</script>
<style lang="less" scoped>
#message {
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
