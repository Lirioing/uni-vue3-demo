<template>
  <lee-swiper-blur :swiperList="swiperList" @tapItem="tapItem"></lee-swiper-blur>
</template>

<script setup>
import { computed, ref } from 'vue';
const swiperList = ref([
  {
    image: '/static/images/components/lee-swiper-blur/swiper1.png'
  },
  {
    image: '/static/images/components/lee-swiper-blur/swiper2.png'
  }
])
// swiper-item的点击事件
const tapItem = (item) => {
  console.log(item, 'tapItem')
}
</script>

<style lang="scss" scoped>
</style>