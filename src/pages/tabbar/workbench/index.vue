<template>
  <view class="home">
    <lee-list :list="menuList" :showLeftIcon="false" @cell-click="openMenuPage"></lee-list>
  </view>
</template>

<script setup>
import { toast } from '@/utils/common'
const menuList = [
  {
    title: 'lee-list列表',
    path: '/pages/component/lee-list/index'
  },
  {
    title: 'lee-empty-page空页面',
    path: '/pages/component/lee-empty-page/index'
  },
  {
    title: 'lee-image-page图片页面',
    path: '/pages/component/lee-image-page/index'
  },
  {
    title: 'lee-signature横屏签名',
    path: '/pages/component/lee-signature/index'
  },
  {
    title: 'lee-swiper-blur背景虚化轮播图',
    path: '/pages/component/lee-swiper-blur/index'
  },
  {
    title: 'lee-swiper-fade双层轮播图',
    path: '/pages/component/lee-swiper-fade/index'
  },
  {
    title: 'lee-lottery抽奖大转盘',
    path: '/pages/component/lee-lottery/index'
  },
  {
    title: 'lee-swiper轮播图',
    path: '/pages/component/lee-swiper/index'
  },
  {
    title: 'lee-full-loading全屏加载示例',
    path: '/pages/component/lee-full-loading/index'
  },
]
const openMenuPage = (item) => {
  if (item.path) {
    uni.navigateTo({
      url: item.path
    })
    return
  }
  toast('敬请期待')
}
</script>

<style lang="scss" scoped>
</style>