<template>
  <view class="swiper-blur">
    <view class="swiper-blur__bg">
      <image class="swiper-blur__bg--image" :src="bgImage" alt="" />
    </view>
    <swiper class="swiper-blur__swiper" 
      :autoplay="true" 
      :circular="true" 
      :interval="3000" 
      :duration="500"
      :current="swiperIndex"
      @change="changeSwiper"
    >
      <swiper-item class="swiper-blur__swiper--item" v-for="(item, index) in swiperList" @click="handleSwiperItem(item)" :key="index">
        <view class="swiper-blur__swiper--image">
          <image :src="item.image"></image>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  swiperList: {
    type: Array,
    default() {
      return []
    }
  }
})
const swiperIndex = ref(0)
const bgImage = computed(() => {
  return props.swiperList[swiperIndex.value].image
})

const changeSwiper = (e) => {
  swiperIndex.value = e.detail.current
}
const emits = defineEmits(['tapItem'])
const handleSwiperItem = (item) => {
  // 点击swiper-item的事件
  emits('tapItem', item)
}

</script>

<style lang="scss" scoped>
.swiper-blur {
  height: 400rpx;
  width: 750rpx;
  position: relative;
  &__bg {
    position: absolute;
    height: 400rpx;
    width: 750rpx;
    top: 0;
    /* #ifdef MP || APP-PLUS */
    z-index: -1;
    /* #endif */
    /* #ifdef H5 */
    z-index: 0;
    /* #endif */
    filter: blur(0);
    overflow: hidden;
    &--image {
      height: 400rpx;
      width: 750rpx;
      filter: blur(10rpx);
    }
  }
  &__swiper {
		height: 315rpx;
		width: 675rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
		&--image {
			height: 315rpx;
			width: 675rpx;
			image {
				height: 315rpx;
			  width: 675rpx;
        border-radius: 8rpx;
			}
		}
  }
}
</style>