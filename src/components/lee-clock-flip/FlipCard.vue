<template>
  <view class="flip-container">
    <!-- 当前显示的面 -->
    <view class="card-front" :class="{ flipping: isFlipping }">
      <view class="card-content">{{ value }}</view>
    </view>
    
    <!-- 翻页的面 -->
    <view class="card-flip" :class="{ flipping: isFlipping }">
      <view class="flip-top">
        <view class="flip-content">{{ value }}</view>
      </view>
      <view class="flip-bottom">
        <view class="flip-content">{{ nextValue }}</view>
      </view>
    </view>
    
    <!-- 下一个显示的面（在背面） -->
    <view class="card-back">
      <view class="card-content">{{ nextValue }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  nextValue: {
    type: String,
    required: true
  }
})

const isFlipping = ref(false)
let flipTimeout = null

watch(() => props.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    startFlipAnimation()
  }
})

const startFlipAnimation = () => {
  isFlipping.value = true
  
  if (flipTimeout) {
    clearTimeout(flipTimeout)
  }
  
  flipTimeout = setTimeout(() => {
    isFlipping.value = false
  }, 600)
}

onMounted(() => {
  // 组件挂载时初始化
})

onUnmounted(() => {
  if (flipTimeout) {
    clearTimeout(flipTimeout)
  }
})
</script>

<style scoped>
.flip-container {
  position: relative;
  width: 90rpx;
  height: 130rpx;
  perspective: 1200rpx;
}

/* 前后卡片样式 */
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #2c3e50;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 70rpx;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
  backface-visibility: hidden;
  overflow: hidden;
}

.card-front {
  z-index: 3;
}

.card-back {
  z-index: 1;
  transform: rotateX(180deg);
}

.card-front.flipping {
  z-index: 2;
}

/* 翻页卡片 */
.card-flip {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  z-index: 3;
}

.flip-top, .flip-bottom {
  position: absolute;
  width: 100%;
  height: 50%;
  overflow: hidden;
  background: #2c3e50;
  backface-visibility: hidden;
}

.flip-top {
  top: 0;
  transform-origin: bottom;
  border-top-left-radius: 12rpx;
  border-top-right-radius: 12rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.3);
}

.flip-bottom {
  bottom: 0;
  transform-origin: top;
  border-bottom-left-radius: 12rpx;
  border-bottom-right-radius: 12rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.1);
  transform: rotateX(180deg);
}

.flip-content {
  width: 100%;
  height: 200%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 70rpx;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.flip-top .flip-content {
  transform: translateY(0%);
}

.flip-bottom .flip-content {
  transform: translateY(-50%);
}

/* 翻页动画 */
.card-flip.flipping .flip-top {
  animation: flipTop 0.6s ease-in-out forwards;
}

@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(-180deg);
  }
}
</style>