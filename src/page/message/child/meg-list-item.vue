<template>
  <div class="msg-list-item">
    <slot v-if="type === 'slot'"></slot>
  </div>
</template>
<script>
export default {
  props: ["isLink", "type", "item"]
};
</script>

<style lang="less" scoped>
@import "./less/meg-list-item.less";
</style>
