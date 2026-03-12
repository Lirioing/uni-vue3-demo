<template>
  <view class="lee-list">
    <view class="lee-list__cell" :class="{'lee-list__cell--border': showBottomBorder}" v-for="(item, index) in list" @click="openMenuPage(item)">
      <view class="lee-list__cell--box">
        <view v-if="showLeftIcon" class="lee-icon">
          <image v-if="item.icon" :src="item.icon"></image>
          <image v-else src="/static/logo.png"></image>
        </view>
        <view class="lee-list__cell--title">{{ item.title }}</view>
      </view>
      <uni-icons v-if="showArrow" type="forward" size="40rpx"></uni-icons>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  showLeftIcon: {
    type: Boolean,
    default: true
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  showBottomBorder: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default() {
      return []
    }
  }
})
const emit = defineEmits(['cell-click'])
const openMenuPage = (item) => {
  emit('cell-click', item)
}
</script>

<style lang="scss" scoped>
.lee-list {
  margin: 30rpx;
  background: #fff;
  border-radius: $lee-radius-base;
  &__cell {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    &--box {
      display: flex;
      align-items: center;
    }
    &--border {
      border-bottom: 1rpx solid #ddd;
    }
  }
}
.lee-icon {
  width: 40rpx;
  height: 40rpx;
  padding-right: 20rpx;
  image {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
  }
}
</style>