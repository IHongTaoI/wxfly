<template>
  <div ref="wrap">{{item}}</div>
</template>
<script>
export default {
  props: ['item'],
  mounted() {
    // this.$refs.wrap.style.height = this.item.height + 'px'
  }
};
</script>
<style lang="less" scoped>
</style>
