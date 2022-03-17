<template>
  <view class="address-card f fd-col">
    <view class="address-card__user-info">
      <text class="userName">{{ userInfo.subUserName }}</text>
      <text class="userPhone">{{ userInfo.subUserPhone }}</text>
    </view>
    <view class="address-card__user-address f f1 jc-sb ai-c">
      <view class="address f1">{{ userInfo.subUserAddress }}</view>
      <view class="operation">
        <uni-icons
          type="compose"
          size="30"
          @click="editCard(userInfo)"
        ></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "address-card",
  props: {
    userInfo: {
      type: Object,
      default: () => ({
        subUserName: "",
        subUserPhone: "",
        subUserAddress: "",
      }),
    },
  },
  setup() {
    const editCard = (userInfo) => {
      const { subUserName, subUserPhone, subUserAddress } = userInfo;
      uni.navigateTo({
        url: `address-edit?userName=${subUserName}&userPhone=${subUserPhone}&userAddress=${subUserAddress}`,
        animationType: "pop-in",
        animationDuration: 100,
      });
    };
    return {
      editCard,
    };
  },
};
</script>
<style lang='scss' scoped>
.address-card {
  margin: 20rpx auto;
  padding: 20rpx;
  width: 94%;
  height: 240rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  background: #fff;
  box-shadow: 2px 2px 5px #ddd;
  &__user-info {
    height: 60rpx;
    line-height: 60rpx;
    font-weight: 600;
    font-size: 40rpx;
    font-family: "Times New Roman", Times, serif;
    .userName {
      margin-right: 20rpx;
    }
  }
  &__user-address {
    font-family: "楷体";
    font-size: 34rpx;
    .address {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>