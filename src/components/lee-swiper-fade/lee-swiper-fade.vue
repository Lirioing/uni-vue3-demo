<template>
  <view class="swiper-fade">
    <view class="swiper-fade__bg">
      <!-- <lee-transition :show="!!opacityImageSrc" type="fade" :duration="1000"> -->
        <image image class="swiper-fade__bg--pos" :src="opacityImageSrc" :style="{'opacity': swiperOpacity}"></image>
      <!-- </lee-transition> -->
      <image class="swiper-fade__bg--image" :src="bgImageSrc" :style="{'opacity': bgOpacity}"></image>
    </view>
    <swiper class="swiper-fade__swiper" 
      :autoplay="true" 
      :circular="true" 
      :interval="5000" 
      :duration="1500"
      :current="swiperIndex"
      @transition="transitionSwiper($event)" 
      @animationfinish="finishSwiper"
      @touchstart="handleTouchStart"
    >
      <swiper-item class="swiper-fade__swiper--item" v-for="(item, index) in list" :key="index" @click="handleSwiperItem(item)">
        <view class="swiper-fade__swiper--image">
          <image :src="item.textImg"></image>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  }
})
const isTouch = ref(false)
const handleTouchStart = () => {
  isTouch.value = true
}
const moveDx = ref(0)
const opacityImageSrc = ref('')
// swiper-item 的位置发生改变时会触发 transition 事件，
const transitionSwiper = (e) => {
  swiperOpacity.value = 0
  moveDx.value = Math.abs(Math.floor(e.detail.dx)) // 计算移动距离的绝对值，用来计算透明度
  let computedSwiperIndex = e.detail.dx > 0 ? 1: -1 // 1是顺序往后划，-1是顺序往前划
  let opacityIndex = swiperIndex.value + computedSwiperIndex
  if (computedSwiperIndex == -1 && isTouch.value == false) {
    opacityIndex = 0
  }
  if (opacityIndex >= props.list.length) {
    opacityIndex = 0
  }
  if (opacityIndex < 0) {
    opacityIndex = props.list.length - 1
  }
  let image = props.list.filter((item, index) => index == opacityIndex)
  opacityImageSrc.value = image[0].underImg
  computeOpacity()
}
const swiperIndex = ref(0)
// 动画结束时会触发 animationfinish 事件
const finishSwiper = (e) => {
  bgOpacity.value = 1
  swiperOpacity.value  = 0
  opacityImageSrc.value = ''
  swiperIndex.value = e.detail.current
  isTouch.value = false
}
// 获取背景图的图片地址
const bgImageSrc = computed(() => {
  let image = props.list.filter((item, index) => index == swiperIndex.value)
  return image[0].underImg
})
const screenWidth = 375
const bgOpacity = ref(1)
const swiperOpacity = ref(0)
// 计算两个图片的透明度
const computeOpacity = () => {
  let swiperOp = (moveDx.value / screenWidth) > 1 ? 1 : moveDx.value / screenWidth
  swiperOpacity.value = parseFloat(swiperOp.toFixed(2))
  let bgOp = (Math.abs(screenWidth - moveDx.value) / screenWidth) <= 0 ? 0 : (Math.abs(screenWidth - moveDx.value) / screenWidth)
  bgOpacity.value = parseFloat(bgOp.toFixed(2))
}
const emits = defineEmits(['tapItem'])
const handleSwiperItem = (item) => {
  // 点击swiper-item的事件
  emits('tapItem', item)
}
</script>

<style lang="scss" scoped>
.swiper-fade {
  height: 600px;
  width: 750rpx;
  position: relative;
  &__bg {
    position: absolute;
    height: 600px;
    width: 750rpx;
    
    &--pos {
      position: absolute;
      height: 600px;
      width: 750rpx;
      top: 0;
      left: 0;
      z-index: 100;
      transform: translate(0%, 0) translateZ(0);
	    transition: 1s;
    }
    &--image {
      position: absolute;
      height: 600px;
      width: 750rpx;
      top: 0;
      left: 0;
      z-index: 9999;
      transform: translate(0%, 0) translateZ(0);
	    transition: 1s;
    }
    
  }
  &__swiper {
    position: absolute;
    z-index: 99999;
    height: 600px;
    width: 750rpx;
    &--image {
      height: 600px;
      width: 750rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>