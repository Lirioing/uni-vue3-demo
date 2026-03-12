<template>
  <view class="empty-box" :style="{ paddingTop: paddingTop}">
    <image class="empty-img" :src="emptyImageUrl"></image>
    <view class="empty-text" :style="emptyTitleStyle">{{ emptyTitle }}</view>
  </view>
</template>

<script setup>
const props = defineProps({
  // 距离顶部的内边距
  paddingTop: {
    type: String,
    default: '50%'
  },
  // 空页面的图片地址
  emptyImageUrl: {
    type: String,
    default: '/static/images/components/lee-empty-page/noShopper.png'
  },
  // 空页面的文案
  emptyTitle: {
    type: String,
    default: '暂无记录'
  },
  // 空页面文案的style样式
  emptyTitleStyle: {
    type: Object,
    default() {
      return {}
    }
  }
})
</script>

<style lang="scss" scoped>
.empty-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .empty-img {
    width: 440rpx;
    height: 360rpx;
  }
  .empty-text {
    color: #999;
    font-size: 26rpx;
  }
}
</style>