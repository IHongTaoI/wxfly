<template>
  <div id="test">
    <Button @click="add">添加</Button>
    <!-- <DynamicScroller :items="filteredItems" :min-item-size="54" class="scroller">
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" class="message">
          <div class="text">{{ item }}</div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>-->
    <auto-virtual-list
      :totalHeight="800"
      :defaultHeight="10"
      style="width: 100%;height: 100%;"
      :tobottom="tobottom"
      :totop="totop"
    >
      <item
        class="text"
        v-for="item of filteredItems"
        :key="item.id"
        :style="{height: item.height + 'px'}"
        :item="item"
      ></item>
    </auto-virtual-list>
  </div>
</template>
<script>
import item from "./test-item";
export default {
  components: {
    item
  },
  created() {
    function getRandomInt(min, max) {
      return parseInt(Math.random() * (max - min + 1)) + min;
    }
    for (var i = 0; i < 100; i++) {
      let heis = [10, 20, 30, 40];
      this.filteredItems.push({
        id: i,
        height: heis[getRandomInt(0, heis.length - 1)]
      });
    }
  },
  data() {
    return {
      filteredItems: []
    };
  },
  methods: {
    add() {
      function getRandomInt(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min;
      }
      let heis = [10, 20, 30, 40];
      this.filteredItems.push({
        id: Math.random(),
        height: heis[getRandomInt(0, heis.length - 1)]
      });
    },
    tobottom() {
      console.log("到达底部了");
    },
    totop() {
      console.log("到达顶部了")
    }
  }
};
</script>
<style lang="less" scoped>
#test {
  height: 500px;
  .text {
    box-sizing: border-box;
    overflow: hidden;
  }
  .list {
    height: 100% !important;
  }
}
</style>
