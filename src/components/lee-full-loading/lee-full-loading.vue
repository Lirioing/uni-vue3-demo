<template>
  <view v-if="visible" class="full-loading">
    <view class="loading-mask"></view>
    <view class="loading-content">
      <!-- 自定义动画效果 -->
      <view class="spinner">
        <image src="/static/images/components/lee-full-loading/logo.png"></image>
      </view>
      <text class="loading-text">{{ text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'FullLoading',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style scoped>
.full-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}

.loading-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 40rpx 60rpx;
  min-width: 200rpx;
}

/* 三个点的动画 */
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
  image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-50rpx);
  }
}

.loading-text {
  color: #aaa;
  font-size: 28rpx;
}
</style>