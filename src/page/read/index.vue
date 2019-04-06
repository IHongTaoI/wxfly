<template>
  <div id="read">
    <ul class="acBoxUl">
      <router-link
        tag="li"
        :to="{ name: 'iframe', query: { src: item.src, title: item.title}}"
        class="acItem"
        :style="{backgroundImage: 'url('+ item.bkImg +')'}"
        v-for="(item, index) in activeList"
        :key="index"
      ></router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeList: [
        {
          title: "百度一下",
          bkImg:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1857822258,3817108768&fm=26&gp=0.jpg",
          src: "http://www.baidu.com"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
#read {
  .acBoxUl {
    .acItem {
      display: flex;
      width: 96%;
      height: 130px;
      margin: 6px auto;
      border-radius: 6px;
      background-size: 100% 100%;
    }
  }
}
</style>
