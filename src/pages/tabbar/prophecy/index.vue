<template>
  <view class="prophecy">
    <lee-clock-flip></lee-clock-flip>
    <view class="prophecy__container">
      <view class="prophecy-title">大乐透随机一注</view>
       <view class="prophecy__box">
        <lee-count-to :max="35" :prizeNum="prizeNumList[0]" ref="p1"></lee-count-to>
        <lee-count-to :max="35" :prizeNum="prizeNumList[1]" ref="p2"></lee-count-to>
        <lee-count-to :max="35" :prizeNum="prizeNumList[2]" ref="p3"></lee-count-to>
        <lee-count-to :max="35" :prizeNum="prizeNumList[3]" ref="p4"></lee-count-to>
        <lee-count-to :max="35" :prizeNum="prizeNumList[4]" ref="p5"></lee-count-to>
        <view class="prophecy__box--dot">·</view>
        <lee-count-to :prizeNum="prizeNumList[5]" ref="p6"></lee-count-to>
        <lee-count-to :prizeNum="prizeNumList[6]" ref="p7"></lee-count-to>
      </view>
      <view class="prophecy__container--controls">
        <button class="prophecy__container--btn" @tap="startRolling" >
          开始滚动
        </button>
        <button class="prophecy__container--btn prophecy__container--reset-btn" @tap="resetRolling">
          重置
        </button>
      </view>
    </view>
   

    
  </view>
</template>

<script setup>
import { ref } from 'vue';
import Lottery from '@/utils/lottery';

const p1 = ref(null)
const p2 = ref(null)
const p3 = ref(null)
const p4 = ref(null)
const p5 = ref(null)
const p6 = ref(null)
const p7 = ref(null)
const prizeNumList = ref([])
// 开始抽奖
const startRolling = () => {
  prizeNumList.value = Lottery.getFlat()
  console.log('中奖号码', prizeNumList.value)
  p1.value.startRolling()
  p2.value.startRolling()
  p3.value.startRolling()
  p4.value.startRolling()
  p5.value.startRolling()
  p6.value.startRolling()
  p7.value.startRolling()
}

const resetRolling = () => {
  p1.value.resetRolling()
  p2.value.resetRolling()
  p3.value.resetRolling()
  p4.value.resetRolling()
  p5.value.resetRolling()
  p6.value.resetRolling()
  p7.value.resetRolling()
}


</script>

<style lang="scss" scoped>

.prophecy {
  padding: 20rpx;
  .prophecy-title {
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30rpx;
    color: #333;
    text-shadow: 1rpx 1rpx 2rpx rgba(0,0,0,0.1);
  }
  &__box {
    padding: 30rpx 20rpx;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &--dot {
      font-size: 32rpx;
      font-weight: 900;
    }
  }
  &__container {
    margin-top: 40rpx;
    padding: 30rpx 0;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.08);
    &--controls {
      display: flex;
      justify-content: center;
      gap: 30rpx;
      margin: 40rpx 30rpx 20rpx;
    }

    &--btn {
      background: #007aff;
      color: white;
      border: none;
      border-radius: 50rpx;
      padding: 6rpx 60rpx;
      font-size: 28rpx;
      font-weight: 500;
      transition: all 0.2s;
    }

    &--btn:active {
      transform: scale(0.95);
    }

    &--btn[disabled] {
      background: #cccccc;
      color: #999999;
    }

    &--reset-btn {
      background: #ff3b30;
    }
  }
}

</style>