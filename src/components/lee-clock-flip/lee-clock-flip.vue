<template>
  <view class="clock-container">
    <!-- 时间显示区域 -->
    <view class="time-display">
      <!-- 小时 -->
      <view class="time-section">
        <FlipCard :value="formattedHours[0]" :next-value="nextFormattedHours[0]" />
        <FlipCard :value="formattedHours[1]" :next-value="nextFormattedHours[1]" />
      </view>
      
      <!-- 冒号分隔符 -->
      <view class="separator">:</view>
      
      <!-- 分钟 -->
      <view class="time-section">
        <FlipCard :value="formattedMinutes[0]" :next-value="nextFormattedMinutes[0]" />
        <FlipCard :value="formattedMinutes[1]" :next-value="nextFormattedMinutes[1]" />
      </view>
      
      <!-- 冒号分隔符 -->
      <view class="separator">:</view>
      
      <!-- 秒钟 -->
      <view class="time-section">
        <FlipCard :value="formattedSeconds[0]" :next-value="nextFormattedSeconds[0]" />
        <FlipCard :value="formattedSeconds[1]" :next-value="nextFormattedSeconds[1]" />
      </view>
    </view>
    
    <!-- 日期显示 -->
    <view class="date-display">
      {{ currentDate }}
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import FlipCard from './FlipCard.vue'

// 当前时间
const currentTime = ref(new Date())
let timer = null

// 格式化数字为两位
const formatNumber = (num) => {
  return num < 10 ? '0' + num : num.toString()
}

// 计算属性：格式化的小时、分钟、秒钟
const formattedHours = computed(() => {
  const hours = currentTime.value.getHours()
  return formatNumber(hours).split('')
})

const formattedMinutes = computed(() => {
  const minutes = currentTime.value.getMinutes()
  return formatNumber(minutes).split('')
})

const formattedSeconds = computed(() => {
  const seconds = currentTime.value.getSeconds()
  return formatNumber(seconds).split('')
})

// 计算下一个值（用于翻页动画）
const nextFormattedHours = computed(() => {
  const nextTime = new Date(currentTime.value.getTime() + 1000)
  const hours = nextTime.getHours()
  return formatNumber(hours).split('')
})

const nextFormattedMinutes = computed(() => {
  const nextTime = new Date(currentTime.value.getTime() + 1000)
  const minutes = nextTime.getMinutes()
  return formatNumber(minutes).split('')
})

const nextFormattedSeconds = computed(() => {
  const nextTime = new Date(currentTime.value.getTime() + 1000)
  const seconds = nextTime.getSeconds()
  return formatNumber(seconds).split('')
})

// 当前日期
const currentDate = computed(() => {
  const date = currentTime.value
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = weekDays[date.getDay()]
  
  return `${year}年${month}月${day}日 ${weekDay}`
})

// 更新时间
const updateTime = () => {
  currentTime.value = new Date()
}

// 生命周期
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);
}

.time-display {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.time-section {
  display: flex;
  gap: 8rpx;
}

.separator {
  font-size: 60rpx;
  font-weight: bold;
  color: #fff;
  margin: 0 15rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
  animation: blink 1s infinite;
}

.date-display {
  font-size: 28rpx;
  color: #e6e6e6;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>