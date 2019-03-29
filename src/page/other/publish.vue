<template>
  <div id="publish" class="paddingTopNav">
    <van-nav-bar title left-arrow @click-left="$router.go(-1)" class="topNavBar">
      <van-button
        type="primary"
        slot="right"
        :loading="isloading"
        class="HBtn"
        @click.native="submit"
      >发表</van-button>
    </van-nav-bar>
    <div class="line"></div>
    <div class="textare">
      <textarea cols="30" rows="10" v-model="content" class="textCont" placeholder="这一刻的想法..."></textarea>
      <span class="wc">{{ wordCount }}</span>
    </div>
    <div class="imgs">
      <div class="jia item" v-show="cacheImgs.length < 6">
        <div class="box">
          <span class="iconfont icon-jia"></span>
          <input type="file" ref="file" class="file" @change="inputImgChange()" multiple>
        </div>
      </div>
      <div class="item" v-for="(v, i) in cacheImgs" :key="i">
        <div class="box">
          <img :src="v" class="img" @click="imagePreview(i)">
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="所在位置" is-link @click.native="getLocation">
        <span slot="icon" class="iconfont icon-weizhi"></span>
      </van-cell>
      <van-cell title="谁可以看" is-link value="公开" @click.native="readcheck">
        <span slot="icon" class="iconfont icon-yonghuicon"></span>
      </van-cell>
      <van-switch-cell v-model="showAdd" title="显示地址"/>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      imgs: "",
      showAdd: true,
      isloading: false,
      cachefiles: [],
      cacheImgs: [], //还未上传的图片
      wordLimit: 200, // 字数限制
      stepCount: 0 // 记录步骤，如果图片上传成功，发布失败，则不需要重新上传图片
    };
  },
  watch: {
    content(cur, old) {
      if (!this.wordCount) {
        this.content = old;
      }
    }
  },
  computed: {
    wordCount() {
      let len = this.content.length;
      let ret = this.wordLimit - len;
      return ret >= 0 ? ret : 0;
    }
  },
  methods: {
    async submit() {
      let ImgRet = "",
        sendRet;
      if (this.isloading) return;
      this.isloading = true;
      if (this.stepCount === 0 && this.cachefiles.length) {
        ImgRet = await this.uploadImg();
        if (!ImgRet) {
          this.isloading = false;
          this.$toast.fail("图片上传失败");
          return;
        }
        ImgRet = ImgRet.d.urls.join(",");
      }
      this.stepCount = 1;
      if (this.stepCount === 1) {
        // 上传图片
        sendRet = await this.$apihelper.sendShare({
          content: this.content,
          imgs: ImgRet,
          tip: "&*asd1@213SAf",
          isShowAdd: this.showAdd ? "1" : "0",
          lng: this.$store.state.user.lng + "",
          lat: this.$store.state.user.lat + ""
        });
      }

      if (!sendRet) {
        this.isloading = false;
        this.$toast.fail("发布失败");
        return;
      }
      this.stepCount = -1;
      // 发布完成
      this.$router.replace({
        path: "/home"
      });
    },
    async uploadImg() {
      let formData = new FormData();
      for (let v of this.cachefiles) {
        formData.append("imgs", v);
      }
      return await this.$apihelper.uploadImg(formData);
    },
    // 谁可以看
    readcheck() {
      this.$toast("敬请期待!!");
    },
    getLocation() {
      this.$toast("敬请期待!!");
    },
    // 图片预览
    imagePreview(i) {
      this.$utils.imagePreview(this.cacheImgs, i);
    },
    async inputImgChange(e) {
      var reader = new FileReader();
      this.cachefiles.push(this.$refs.file.files[0]);
      reader.readAsDataURL(this.$refs.file.files[0]);
      reader.onload = () => {
        this.cacheImgs.push(reader.result);
      };
    }
  }
};
</script>
<style lang="less" scoped>
#publish {
  overflow-y: auto;
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
  &,
  & > .topNavBar {
    background: #fff;
  }
  .HBtn {
    height: 30px;
    line-height: 26px;
    font-size: 14px;
  }
  .textare {
    position: relative;
    text-align: center;
    .textCont {
      width: 100%;
      padding: 5px 10px;
      height: 180px;
      font-size: 18px;
      border: none;
    }
    .wc {
      position: absolute;
      bottom: 2px;
      right: 5px;
      color: #bab9ba;
      font-size: 13px;
    }
  }
  .imgs {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    height: 66vw;
    .item {
      width: 33.33vw;
      height: 33.33vw;
      display: flex;
      justify-content: center;
      align-items: center;
      &.jia .box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f3f1f2;
        text-align: center;
        line-height: 33.33vw;

        .file {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          left: 0;
          top: 0;
        }
      }
      .box {
        width: 80%;
        height: 80%;
        .img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
