<template>
  <view class="address-edit f fd-col">
    <nav-bar left-text="编辑联系人地址" :url="'address-management'" />
    <bg-set background-color="#f2f3f7" />
    <view class="address-edit__edit-part">
      <uni-forms ref="form" :rules="rules" :modelValue="formData">
        <uni-forms-item label="姓名" name="userName" required
          ><uni-easyinput
            v-model="formData.userName"
            :inputBorder="false"
            :focus="true"
            :clearable="false"
            placeholder="请输入姓名"
        /></uni-forms-item>
        <uni-forms-item label="手机号" name="userPhone" required>
          <uni-easyinput
            v-model="formData.userPhone"
            :inputBorder="false"
            :focus="true"
            :clearable="false"
            placeholder="请输入手机号"
        /></uni-forms-item>
        <uni-forms-item label="地址" name="userAddress" required>
          <uni-easyinput
            v-model="formData.userAddress"
            :inputBorder="false"
            :focus="true"
            :clearable="false"
            placeholder="请输入地址"
        /></uni-forms-item>
      </uni-forms>
    </view>
    <view class="address-edit__confirm-part f jc-c">
      <!-- <button
        type="primary"
        class="button"
        :loading="isLoading"
        @click="submit"
      >
        确认修改
      </button> -->
      <van-button
        type="primary"
        size="normal"
        class="button"
        :loading="isLoading"
        loading-type="spinner"
        loading-text="提交修改中"
        @click="submit"
        >确认修改</van-button
      >
    </view>
    <uni-popup ref="popup" type="center">
      <uni-popup-message
        :type="success ? 'success' : 'error'"
        :message="success ? '修改成功' : '修改失败，请稍后重试'"
        :duration="2000"
      ></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script>
import profileAPI from "/api/modules/profile";
import StorageOperation from "/utils/storage";
export default {
  name: "address-edit",
  data() {
    return {
      isLoading: false,
      success: false,
      rules: {
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
        userAddress: {
          rules: [{ required: true, errorMessage: "地址不能为空" }],
        },
      },
      formData: {
        userName: "",
        userPhone: "",
        userAddress: "",
      },
      formDataCopy: {},
    };
  },
  onLoad(option) {
    this.formData = option;
    this.formDataCopy = Object.assign({}, option);
  },
  methods: {
    submit() {
      this.isLoading = true;
      this.$refs.form
        .validate()
        .then((res) => {
          const { userName: oldUserName, userPhone: oldUserPhone } =
            this.formDataCopy;
          const {
            userName: newUserName,
            userPhone: newUserPhone,
            userAddress: newUserAddress,
          } = res;
          const userName = StorageOperation.getStorageSync("userName").value;
          profileAPI
            .updateAddress({
              newUserName,
              newUserPhone,
              newUserAddress,
              oldUserName,
              oldUserPhone,
              userName,
            })
            .then((response) => {
              console.log(response);
              this.$refs.popup.open();
              this.success = true;
              setTimeout(() => {
                this.$refs.popup.close();
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
              this.$refs.popup.open();
              this.success = false;
              setTimeout(() => {
                this.$refs.popup.close();
              }, 2000);
            })
            .finally(() => {
              this.isLoading = false;
            });
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.address-edit {
  position: relative;
  width: 100%;
  height: 100vh;
  &__edit-part {
    margin: 20rpx 20rpx;
    padding: 30rpx;
    width: 94%;
    height: 400rpx;
    box-sizing: border-box;
    border-radius: 40rpx;
    background-color: #fff;
    ::v-deep .uni-forms {
      .uni-forms-item {
        .uni-forms-item__label {
          height: 80rpx;
          .label-text {
            font-size: 30rpx;
          }
        }
        .uni-forms-item__content {
          display: flex;
          align-items: center;
          .uni-easyinput__content-input {
            font-size: 30rpx;
          }
        }
      }
    }
  }
  &__confirm-part {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200rpx;
    background-color: #fff;
    .button {
      margin-top: 40rpx;
      width: 300rpx;
      border-radius: 40rpx;
    }
  }
}
</style>