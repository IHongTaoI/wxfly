<template>
  <div id="self">
    <div class="weui-cells" style="margin-top:0;padding-top: 12px;">
      <router-link to="/self/userinfo" class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <div class="self-header userava">
            <img class="self-header" v-lazy="userInfo.userAvatar || ava">
          </div>
        </div>
        <div class="weui-cell__bd">
          <h4 class="self-nickname">{{userInfo.userName || '未设置用户名'}}</h4>

          <p class="self-wxid">用户id: {{userId}}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
    <van-cell-group class="mt20">
      <van-cell title="收藏" is-link to="/self/collection">
        <span slot="icon" class="iconfont icon-icon_save" style="color:#0078D7;"></span>
      </van-cell>
      <van-cell title="下载app" is-link url="http://www.hhooke.cn/wxfly.apk" v-show="redDot.downloadApp">
        <span class="iconfont icon-xiazai" style="color:#f43531;" slot="icon">
          <i class="new-msg-dot"></i>
        </span>
      </van-cell>
      <van-cell title="测试页面" is-link to="/self/test">
        <span slot="icon" class="iconfont icon-dongtai" style="color:#0078D7;"></span>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="mt20">
      <van-cell title="设置" is-link to="/self/setting">
        <span slot="icon" class="iconfont icon-shezhi" style="color:#666666;"></span>
      </van-cell>
      <van-cell title="关于我们" is-link to="/aboutMe">
        <span slot="icon" class="iconfont icon-icoguanyuwomen" style="color:#666666;"></span>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  created() {
    console.log(this.$store.state.platform);
  },
  computed: {
    ...mapState("user", ["userInfo", "userId"]),
    ...mapState("common", ["redDot"])
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
