<template>
  <view class="lee-lottery">
    <view class="lee-lottery__container">
      <!-- 背景 -->
      <image :src="lotteryBg.bg" class="lee-lottery__container--cont"></image>
      <image :src="lotteryBg.caidai" class="lee-lottery__container--caidai"></image>
      <view class="lee-lottery__main">
        <view class="lee-lottery__main--header">
          <view class="lee-lottery__main--title">幸运大转盘</view>
          <view class="lee-lottery__main--sectitle">最高抽取<text class="lee-lottery__main--time">3</text>次免单</view>
          <view class="lee-lottery__main--rule" @click="openRule">规则</view>
        </view>
        <view class="lee-lottery__canvas">
          <!-- 抽奖圆盘图片 -->
          <image class="lee-lottery__canvas--image" :src="lotteryBg.circle"></image>
          <view :animation="animationData" class="lee-lottery__canvas--content">
            <view class="lee-lottery__canvas--line">
              <view class="lee-lottery__canvas--line-item" v-for="(item,index) in prizeList" :key="index"
                :style="{transform:'rotate('+(index * width + width / 2)+'deg)'}"></view>
            </view>

            <view class="lee-lottery__canvas--list">
              <view class="lee-lottery__canvas--item" :style="{transform: 'rotate('+(index * width)+'deg)', zIndex:index, }" v-for="(iteml,index) in prizeList" :key="index">
                <view class="lee-lottery__canvas--text" :style="'transform:rotate('+(index )+')'">
                  <text class="b" style="font-size: 32upx;">{{iteml.name}}</text>
                  <view class="lee-lottery__canvas--icon"></view>
                </view>
              </view>
            </view>
          </view>
          <view class="lee-lottery__pointer">
            <!-- 抽奖指针图片 -->
            <image :src="lotteryBg.pointer"></image>
            <view class="lee-lottery__pointer--text">{{ joinInfo.canJoinCount }}次</view>
          </view>
        </view>
        <view class="lee-lottery__footer">
          <!-- 抽奖底座图片 -->
          <view class="lee-lottery__footer--image">
            <image :src="lotteryBg.footer"></image>
          </view>
          <view class="lee-lottery__footer--btn" v-bind:class="btnDisabled" @click="startActivity">
            <!-- 抽奖button图片 -->
            <image :src="lotteryBg.button"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  prizeList: {
    type: Array,
    default() {
      return []
    }
  },
  activityInfo: {
    type: Object,
    default() {
      return {}
    }
  },
  joinInfo: {
    type: Object,
    default() {
      return {}
    }
  },
})
const lotteryBg = ref({
  bg: '/static/images/components/lee-lottery/bg.png',
  caidai: '/static/images/components/lee-lottery/caidai.png',
  circle: '/static/images/components/lee-lottery/circle.png',
  footer: '/static/images/components/lee-lottery/footer.png',
  button: '/static/images/components/lee-lottery/button.png',
  pointer: '/static/images/components/lee-lottery/pointer.png'
})
const animationData = ref({})
const btnDisabled = ref('')

const width = computed(() => 360 / props.prizeList.length || 0)

const runDeg = ref(0)
// 抽奖动画
const animation = (index, duration) => {
  var runNum = 4; //旋转8周

  // 旋转角度
  runDeg.value = runDeg.value || 0;
  runDeg.value = runDeg.value + (360 - runDeg.value % 360) + (360 * runNum - index * (360 / props.prizeList.length)) +1
  // 创建动画
  var animationRun = uni.createAnimation({
    duration: duration,
    timingFunction: 'ease'
  })
  animationRun.rotate(runDeg.value).step();
  animationData.value = animationRun.export();
  btnDisabled.value = 'disabled';
}
// 打开活动规则弹框
const openRule = () => {
  uni.showToast({
    title: props.activityInfo.rule,
    icon: 'none'
  })
}
const emits = defineEmits(['joinActivity', 'openPrize'])
// 发起抽奖动画
const playReward = (index, duration = 4000) => {
  animation(index, duration)

  setTimeout(() => {
    emits('openPrize')
    btnDisabled.value = '';
  }, duration + 1000)
}
// 开始抽奖
const startActivity = () => {
  btnDisabled.value = 'disabled'
  emits('joinActivity')
}

defineExpose({
  playReward: playReward
})

</script>

<style lang="scss" scoped>
.lee-lottery {
  width: 750rpx;
  height: 100vh;
  height: calc(100vh - var(--window-top));
  overflow-x: hidden;
  &__container {
    width: 750rpx;
    height: 100%;
    position: relative;
    &--cont {
      width: 750rpx;
      height: 100%;
      position: absolute;
      z-index: 0;
    }
    &--caidai {
      position: absolute;
      top: 0;
      left: 0;
      width: 750rpx;
      height: 100%;
    }
  }
  &__main {
    position: relative;
    &--header {
      padding: 40rpx 0;
    }
    &--title {
      text-align: center;
      color: #fdf9d1;
      font-size: 80rpx;
      font-weight: 600;
      letter-spacing: 4rpx;
    }
    &--sectitle {
      text-align: center;
      color: #fdf9d1;
      font-size: 40rpx;
      font-weight: 600;
      letter-spacing: 4rpx;
    }
    &--time {
      font-size: 50rpx;
    }
    &--rule {
      position: absolute;
      color: #333;
      width: 100rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      top: 80rpx;
      right: 0;
      border-radius: 50rpx 0 0 50rpx;
      background: #fff;
    }
  }
  &__canvas {
    margin: 0 auto;
    position: relative;
    width: 600rpx;
    height: 600rpx;
    z-index: 100;
    &--image {
      width: 600rpx;
      height: 600rpx;
      border-radius: 50%;
    }
    &--content {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      display: block;
      width: 600rpx;
      height: 600rpx;
      border-radius: inherit;
    }
    &--list {
      position: absolute;
      left: 0;
      top: 0;
      width: inherit;
      height: inherit;
      z-index: 9999;
    }
    &--item {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      color: #e4370e;
    }
    &--text {
      position: relative;
      display: block;
      padding-top: 68rpx;
      margin: 0 auto;
      text-align: center;
      -webkit-transform-origin: 50% 300upx;
      transform-origin: 50% 300upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      font-weight: 600;
      text {
        font-size: 30upx;
      }
    }
    &--icon {
      margin-top: 10rpx;
      width: 72rpx;
      height: 72rpx;
      background-color: #ccc;
    }
    &--line {
      position: absolute;
      left: 0;
      top: 0;
      width: inherit;
      height: inherit;
      z-index: 99;
    }
    &--line-item {
      position: absolute;
      left: 300rpx;
      top: 0;
      width: 3upx;
      height: 300rpx;
      background-color: rgba(228, 55, 14, 0.4);
      overflow: hidden;
      -webkit-transform-origin: 50% 300rpx;
      transform-origin: 50% 300rpx;
    }
    
  }
  &__pointer {
    position: absolute;
    left: 250rpx;
    top: 228rpx;
    z-index: 400;
    width: 98rpx;
    height: 125rpx;
    font-size: 26upx;
    image {
      width: 100%;
      height: 100%;
    }
    &--text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -20%);
      width: 100%;
      text-align: center;
      font-size: 24rpx;
      color: #fff;
    }
  }
  &__footer {
    position: absolute;
    width: 100%;
    &--image {
      margin: -56rpx auto 0;
      width: 600rpx;
      height: 196rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    &--btn {
      margin: 60rpx auto 0;
      width: 480rpx;
      height: 178rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #af3e1c;
      font-size: 34rpx;
      font-weight: 800;
      letter-spacing: 2rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.disabled {
  pointer-events: none;
  opacity: 0.75;
}
</style>
