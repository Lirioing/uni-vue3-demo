<template>
  <view class="signature">
    <button class="signature-button" @click="openSignature">点击签名</button>
    <image class="signature-image" v-if="signatureUrl" :src="signatureUrl"></image>
    <lee-signature v-model="showSignature" @success="getSignatureUrl"></lee-signature>
  </view>
</template>

<script setup>
import { ref } from 'vue';


const showSignature = ref(false)
const signatureUrl = ref('')
const openSignature = () => {
  showSignature.value = true
}
// 获取签名图片地址
const getSignatureUrl = (image) => {
  signatureUrl.value = image
}
</script>

<style lang="scss" scoped>
.signature {
  padding: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.signature-button {
  width: 260rpx;
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: $uni-color-primary;
}
.signature-image {
  box-sizing: border-box;
  margin-top: 30rpx;
  width: 344rpx;
  height: 909rpx;
}
</style>