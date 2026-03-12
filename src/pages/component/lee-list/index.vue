<template>
  <view class="component-lee-list">
    <lee-list :list="menuList" :showLeftIcon="false" :showArrow="false" @cell-click="openMenuPage"></lee-list>
    <lee-list :list="menuList" :showLeftIcon="true" :showArrow="false" @cell-click="openMenuPage"></lee-list>
    <lee-list :list="menuList" :showLeftIcon="true" @cell-click="openMenuPage"></lee-list>
    <lee-list :list="menuList" :showLeftIcon="true" :showBottomBorder="true" @cell-click="openMenuPage"></lee-list>
  </view>
</template>

<script setup>
const menuList = [
  {
    title: 'lee-list列表',
    path: ''
  },
  {
    title: 'lee-signature横屏签名',
    path: ''
  },
  {
    title: 'lee-swiper-blur背景虚化轮播图',
    path: ''
  },
  {
    title: 'lee-swiper-fade双层轮播图',
    path: ''
  },
  {
    title: 'lee-lottery抽奖大转盘',
    path: ''
  },
]
const openMenuPage = (item) => {
  if (item.path) {
    uni.navigateTo({
      url: item.path
    })
    return
  }
  uni.showToast({
    title: '敬请期待',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.component-lee-list {
  padding-bottom: 10rpx;
}
</style>