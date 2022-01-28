<template>
  <uni-nav-bar
    left-icon="back"
    :left-text="leftText"
    :title="title"
    :statusBar="true"
    @clickLeft="goBack"
  ></uni-nav-bar>
</template>

<script>
export default {
  name: "nav-bar",
  props: {
    leftText: {
      type: String,
      default: "返回",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const goBack = () => {
      uni.navigateBack({
        delta: 1,
        animationType: "slide-in-left",
        animationDuration: 100,
      });
    };
    return {
      goBack,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .uni-navbar__header {
  > .uni-navbar__header-btns.uni-navbar__header-btns-left {
    width: auto !important;
  }
}
</style>
