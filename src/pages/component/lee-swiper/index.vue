<template>
  <view class="lee-swiper">
    <lee-swiper :list="swiperList" :height="168" :margin="50" zoom :radius="20" :indicator="false" :autoplay="false" :circular="false"></lee-swiper>
    <view>1</view>
    <view>1</view>
    <view>1</view>
    <view>
      <lee-tabs :list="tabList" :current="currentTab" @change="changeTab"></lee-tabs>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';


const swiperList = ref([
  'https://xianguowo-oss.oss-cn-hangzhou.aliyuncs.com/crmebimage/image/2026/03/12/5a747ffca9e44d61bac29621a2d7ea3azypndnncwo.png',
  'https://xianguowo-oss.oss-cn-hangzhou.aliyuncs.com/crmebimage/image/2026/03/12/5a747ffca9e44d61bac29621a2d7ea3azypndnncwo.png',
  'https://xianguowo-oss.oss-cn-hangzhou.aliyuncs.com/crmebimage/image/2026/03/12/5a747ffca9e44d61bac29621a2d7ea3azypndnncwo.png',
])

const tabList = ref([
  {
    name: '全部'
  },
  {
    name: '人气兑换'
  },
  {
    name: '兑换果昔'
  }
])
const currentTab = ref(0)
const changeTab = (index) => {
  console.log(index)
  currentTab.value = index
}
</script>

<style lang="scss" scoped>
</style>