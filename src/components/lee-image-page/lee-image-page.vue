<template>
  <view class="lee-image-page">
    <image class="lee-image-page__bg" mode="widthFix" :src="bg"></image>
    <view class="lee-image-page__total">
      <view class="lee-image-page__total--box">
        <view class="lee-image-page__total--money">{{ remark }}</view>
      </view>
    </view>
    <view class="lee-image-page__invite" @click="">
      <button class="lee-image-page__invite--button" :open-type="isShare? 'share' : ''">
        <view class="lee-image-page__invite--image">
          <image :src="btn"></image>
        </view>
      </button>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  bg: {
    type: String,
    default: '/static/images/components/lee-image-page/bg.png'
  },
  btn: {
    type: String,
    default: '/static/images/components/lee-image-page/btn.png'
  },
  isShare: {
    type: Boolean,
    default: false
  },
  remark: {
    type: String,
    default: '这是一个功能区'
  }
})
</script>
<style lang="scss" scoped>
.lee-image-page {
  position: relative;
  min-height: 100vh;
  width: 750rpx;
  background: #fef1ec;
  &__bg {
    width: 750rpx;
    height: 1624rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  &__total {
    position: absolute;
    box-sizing: border-box;
    top: 834rpx;
    width: 100%;
    padding: 0 36rpx;
    &--box {
      display: flex;
      align-items: baseline;
      justify-content: center;
    }
    &--money {
      font-size: 80rpx;
      color: #dd100b;
    }
  }
  &__invite {
    position: absolute;
    top: 1280rpx;
    width: 100%;
    &--button {
      box-sizing: content-box;
      width: 305rpx;
      height: 74rpx;
      margin: 0 auto;
      background: transparent;
    }
    &--button::after {
      border: none;
    }
    &--image {
      width: 305rpx;
      height: 74rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }

  }
  
}
</style>