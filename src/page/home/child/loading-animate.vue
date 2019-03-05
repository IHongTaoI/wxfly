<template>
  <div id="loading-adminte">
    <div class="d">
      <span class="s"></span>
    </div>
    <div class="d">
      <span class="s"></span>
    </div>
    <div class="d">
      <span class="s"></span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
#loading-adminte {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  margin-top: 100px;
  position: relative;
  animation: loadani 3s linear infinite;
  .d {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .s {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #99cc66;
    position: absolute;
    left: 50%;
    margin-top: -10px;
    margin-left: -10px;
    animation: changeBgColor 3s ease infinite;
  }
  & .d:nth-child(2) {
    transform: rotate(120deg);
  }
  & .d:nth-child(3) {
    transform: rotate(240deg);
  }
  & .d:nth-child(2) span {
    animation-delay: 1s;
  }
  & .d:nth-child(3) span {
    animation-delay: 2s;
  }
}

@keyframes loadani {
  0% {
    transform: rotate(0deg);
  }
  33.3% {
    transform: rotate(120deg);
  }
  66.6% {
    transform: rotate(240deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes changeBgColor {
  0%,
  100% {
    background: #99cc66;
  }
  33.3% {
    background: #ffff66;
  }
  66.6% {
    background: #ff6666;
  }
}
</style>
