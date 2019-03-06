<template>
  <div id="self">
    <div class="weui-cells" style="margin-top:0;padding-top: 12px;">
      <router-link to="/self/userinfo" class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <div class="self-header userava">
            <lazy-img :src="userInfo.avatarUrl" class="self-header"></lazy-img>
          </div>
        </div>
        <div class="weui-cell__bd">
          <h4 class="self-nickname">{{userInfo.nickName}}</h4>

          <p class="self-wxid">用户id: {{userId}}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <span class="iconfont icon-icon_save" style="color:#0078D7;">
            <i class="new-msg-dot"></i>
          </span>
          <p class="iconfrt">我的收藏</p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <span class="iconfont icon-dongtai" style="color:#0078D7;"></span>
          <p class="iconfrt">我的动态</p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <span class="iconfont icon-shezhi" style="color:#666666;">
            <!-- <i class="new-msg-dot"></i> -->
          </span>
          <p class="iconfrt">设置</p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("user", ["userInfo", "userId"])
  }
};
</script>
<style lang="less" scoped>
#self {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  overflow-x: hidden;
  overflow-y: auto;
  .userava {
    margin-right: 10px;
    width: 60px;
    height: 60px;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .iconfrt {
    vertical-align: middle;
    display: inline-block;
  }
  .iconfont {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    margin-right: 8px;
  }
  .self-nickname {
    font-weight: bold;
    font-size: 20px;
  }
  .self-wxid {
    font-size: 14px;
    line-height: 27px;
  }
}
</style>
