<template>
  <view class="phone-management-page">
    <nav-bar left-text="取件手机号管理" />
    <bg-set background-color="#f2f3f7" />
    <view class="phone-management-page__card">
      <view class="title">我的手机号</view>
      <view class="phone f jc-sb ai-c">
        <view class="left f ai-c">
          <image
            src="/static/image/profile/sdz.png"
            mode="widthFix"
            class="img"
          ></image>
          <text>{{ phoneNumber }}</text>
        </view>
        <view class="right">
          <text @click="editPhoneNumber">修改</text>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        mode="input"
        message="修改手机号成功"
        :title="
          titleStatus === 1 ? '修改手机号' : '手机号码格式有误请重新输入！！！'
        "
        placeholder="请输入修改后的手机号码"
        :before-close="true"
        :value="userPhone.value"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import { ref, computed } from "vue";
import storageOperation from "/utils/index";
import profileAPI from "/api/modules/profile";
export default {
  name: "phone-management-page",
  setup() {
    const popup = ref(null);
    const titleStatus = ref(1);
    const phone = ref(storageOperation.getStorageSync("userPhone").value);
    const phoneNumber = computed(() => {
      const start = phone.value.slice(0, 3);
      const end = phone.value.slice(7);
      return start + "****" + end;
    });
    const userPhone = computed(() => phone);
    const editPhoneNumber = () => popup.value.open();
    const close = () => popup.value.close();
    const confirm = (phoneNumber) => {
      if (phoneNumber.length === 11) {
        const name = storageOperation.getStorageSync("userName").value;
        storageOperation.setStorage("userPhone", phoneNumber);
        phone.value = phoneNumber;
        profileAPI
          .updatePhoneNumber({ userPhone: phoneNumber, userName: name })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        popup.value.close();
      } else {
        titleStatus.value = 2;
        setTimeout(() => {
          titleStatus.value = 1;
        }, 2000);
      }
    };
    return {
      popup,
      titleStatus,
      phoneNumber,
      userPhone,
      editPhoneNumber,
      close,
      confirm,
    };
  },
};
</script>
<style lang='scss'>
.phone-management-page {
  &__card {
    padding: 40rpx 20rpx;
    height: 200rpx;
    background-color: #fff;
    .phone {
      margin-top: 40rpx;
      width: 100%;
      height: 80rpx;
      .left {
        .img {
          margin-right: 20rpx;
          width: 80rpx;
          border-radius: 40rpx;
        }
      }
      .right {
        color: #5fb1f2;
      }
    }
  }
}
</style>