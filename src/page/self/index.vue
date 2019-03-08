<template>
  <div id="self">
    <div class="weui-cells" style="margin-top:0;padding-top: 12px;">
      <router-link to="/self/userinfo" class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <div class="self-header userava">
            <img class="self-header" v-lazy="userInfo.d.userAvatar || ava">
          </div>
        </div>
        <div class="weui-cell__bd">
          <h4 class="self-nickname">{{userInfo.d.userName || '未设置用户名'}}</h4>

          <p class="self-wxid">用户id: {{userInfo.h.userId}}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
    <van-cell-group class="mt20">
      <van-cell title="我的收藏" is-link to="/self/collection">
        <span slot="icon" class="iconfont icon-icon_save" style="color:#0078D7;"></span>
      </van-cell>
      <van-cell title="我的动态" is-link>
        <span slot="icon" class="iconfont iconfont icon-dongtai" style="color:#0078D7;"></span>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="mt20">
      <van-cell title="设置" is-link to="/self/setting">
        <span slot="icon" class="iconfont iconfont icon-shezhi" style="color:#666666;"></span>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    userInfo() {
      return this.$utils.getCookiesUserinfo();
    }
  },
  data() {
    return {
      ava:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551893841562&di=345411edc20bb9c87203881672904900&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F31%2F87%2F96573b585a7c9c4.jpg"
    };
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
