<template>
  <view>
    <!-- 页面内容 -->
    <view class="content">...</view>
    
    <!-- 全屏loading组件 -->
    <lee-full-loading :visible="loadingVisible" :text="loadingText" />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loadingVisible = ref(false)
const loadingText = ref('加载中...')

onMounted(() => {
  init()
})

const init = () => {
  showLoading()
  setTimeout(() => {
    hideLoading()
  }, 5000)
}

const hideLoading = () => {
  loadingVisible.value = false
}

const showLoading = (text = '加载中...') => {
  loadingText.value = text
  loadingVisible.value = true
}
</script>