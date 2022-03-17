<template>
  <view class="user-info-edit f fd-col ai-c">
    <nav-bar left-text="编辑用户信息" />
    <bg-set background-color="#f2f3f7" />
    <view class="user-info-edit__edit-part f fd-col">
      <view class="user-about f"
        ><view class="head-portrait-upload f fd-col ai-c">
          <view><text>用户头像</text></view>
          <van-uploader :after-read="afterRead" />
        </view>
        <view class="user-info f1">
          <view class="name">{{ formData.userName }}</view>
          <view class="phone">{{ formData.userPhone }}</view>
        </view></view
      >
      <view class="edit">
        <uni-forms ref="form" :rules="rules" :modelValue="formData">
          <uni-forms-item label="用户名" name="userName" required
            ><uni-easyinput
              v-model="formData.userName"
              placeholder="请输入用户名"
          /></uni-forms-item>
          <uni-forms-item label="手机号" name="userPhone" required
            ><uni-easyinput
              v-model="formData.userPhone"
              placeholder="请输入手机号"
          /></uni-forms-item>
          <uni-forms-item label="密码" name="userPwd" required
            ><uni-easyinput
              v-model="formData.userPwd"
              placeholder="请输入密码"
              type="password"
          /></uni-forms-item>
          <uni-forms-item label="请再次输入密码" name="userPwdR" required
            ><uni-easyinput
              v-model="formData.userPwdR"
              placeholder="请再次输入密码"
              type="password"
              @blur="handleUserPwdRBlur"
          /></uni-forms-item>
        </uni-forms>
      </view>
      <view class="button f jc-c">
        <van-button type="primary">确认修改</van-button>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, reactive, watchEffect } from "vue";
import loginAPI from "/api/modules/login";
import profileAPI from "/api/modules/profile";
import StorageOperation from "/utils/storage";
export default {
  name: "user-info-edit",
  setup() {
    const formData = reactive({
      userName: "",
      userPhone: "",
      userPwd: "",
      userPwdR: "",
    });
    const rules = {
      userName: { rules: [{ required: true, errorMessage: "姓名不能为空" }] },
      userPhone: {
        rules: [
          { required: true, errorMessage: "手机号不能为空" },
          {
            validateFunction: (rule, value, data, callback) => {
              // 异步需要返回 Promise 对象
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value.length === 11) {
                    // 通过返回 resolve
                    resolve();
                  } else {
                    // 不通过返回 reject(new Error('错误信息'))
                    reject(new Error("手机号码必须是11位数字!"));
                  }
                }, 0);
              });
            },
          },
        ],
      },
      userPwd: { rules: [{ required: true, errorMessage: "密码不能为空" }] },
      userPwdR: {
        rules: [
          {
            required: true,
            errorMessage: "前后设置密码不一致",
          },
          {
            validateFunction: (rule, value, data, callback) => {
              // 异步需要返回 Promise 对象
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value === formData.userPwd) {
                    // 通过返回 resolve
                    resolve();
                  } else {
                    // 不通过返回 reject(new Error('错误信息'))
                    reject(new Error("前后设置密码不一致!"));
                  }
                }, 0);
              });
            },
          },
        ],
        validateTrigger: "bind",
      },
    };
    const afterRead = (file) => {
      console.log(file);
      profileAPI
        .uploadImage(file)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getUseInfo = () => {
      const userName = ref(StorageOperation.getStorageSync("userName"));
      const userPhone = ref(StorageOperation.getStorageSync("userPhone"));
      const userPwd = ref(StorageOperation.getStorageSync("userPwd"));
      loginAPI
        .loginQuery({
          userName: userName.value,
          userPhone: userPhone.value,
          userPwd: userPwd.value,
        })
        .then((res) => {
          console.log(res);
          formData.userName = res[0].userName;
          formData.userPhone = res[0].userPhone;
          formData.userPwd = res[0].userPwd;
          formData.userPwdR = res[0].userPwd;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const handleUserPwdRBlur = (e) => {
      if (formData.userPwd !== formData.userPwdR) {
      }
    };
    watchEffect(() => {
      getUseInfo();
    });
    return { rules, formData, afterRead, handleUserPwdRBlur };
  },
};
</script>
<style lang='scss' scoped>
.user-info-edit {
  width: 100%;
  height: 100vh;
  &__edit-part {
    margin-top: 100rpx;
    padding: 20rpx;
    width: 96%;
    height: 840rpx;
    border-radius: 30rpx;
    box-sizing: border-box;
    box-shadow: 4px 2px 10px #bbb;
    background-color: #fff;
    .user-about {
      margin-bottom: 50rpx;
      .head-portrait-upload {
        margin-right: 20rpx;
        ::v-deep .van-uploader__upload {
          margin: 0;
        }
      }
      .user-info {
        padding: 30rpx;
        font-size: 40rpx;
        .phone {
          margin-top: 50rpx;
          font-size: 30rpx;
        }
      }
    }
  }
}
</style>