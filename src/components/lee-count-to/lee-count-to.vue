<template>
  <view class="rolling-box" :style="boxStyle">
    <text class="number-text">{{ displayedNumber }}</text>
  </view>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  /**
   * 根据最大值生成1-max的数组，
   */
  max: {
    type: Number,
    default: 12
  },
  /**
   * 最终停止的数字
   */
  prizeNum: {
    type: Number,
    default: 0
  }
})

// 基础数据
const NUMBER_ARRAY = computed(() => {
  return [...Array(props.max)].map((_, i) => i + 1)
})
// 最终停止的数字
const targetNumber = computed(() => {
  return props.prizeNum
}) 
const displayedNumber = ref(0) // 当前显示的数字
const isRolling = ref(false) // 是否正在滚动


// 滚动配置
const fastDuration = ref(2200) // 快速滚动时间：2.2秒
const slowDuration = ref(800)  // 减速滚动时间：0.8秒
const totalDuration = ref(3000) // 总时间：3秒
const fastSpeed = ref(40)      // 快速滚动速度

// 计时器引用
let rollTimer = null
let rollStartTime = 0

// 盒子样式
const boxStyle = computed(() => {
  return {
    borderColor: isRolling.value ? '#4cd964' : '#007aff',
    boxShadow: isRolling.value ? '0 0 20px rgba(76, 217, 100, 0.5)' : '0 5px 15px rgba(0, 0, 0, 0.1)',
    transform: isRolling.value ? 'scale(1.05)' : 'scale(1)'
  }
})

// 获取随机其实位置
const getRandomNumber = () => {
  const randomIndex = Math.floor(Math.random() * NUMBER_ARRAY.value.length)
  return NUMBER_ARRAY.value[randomIndex]
}

// 开始单个数字滚动
const startRolling = () => {
  if (isRolling.value) return
  
  isRolling.value = true
  displayedNumber.value = getRandomNumber()
  rollStartTime = Date.now()
  
  // 清空可能存在的定时器
  if (rollTimer) {
    clearInterval(rollTimer)
  }
  
  // 开始快速滚动
  rollTimer = setInterval(() => {
     const currentIndex = NUMBER_ARRAY.value.indexOf(displayedNumber.value)
    const nextIndex = (currentIndex + 1) % NUMBER_ARRAY.value.length
    displayedNumber.value = NUMBER_ARRAY.value[nextIndex]
    
    // 计算已经滚动的时间
    const elapsed = Date.now() - rollStartTime
    
    // 如果超过了快速阶段，进入减速阶段
    if (elapsed >= fastDuration.value) {
      clearInterval(rollTimer)
      
      // 计算减速阶段需要滚动的总次数
      const remainingDistance = getRemainingDistance(displayedNumber.value, targetNumber.value)
      const slowSpeed = calculateSlowSpeed(remainingDistance, slowDuration.value)
      
      // 减速滚动阶段（0.8秒）
      rollTimer = setInterval(() => {
        const elapsed = Date.now() - rollStartTime
        const progress = Math.min((elapsed - fastDuration.value) / slowDuration.value, 1)
        
        // 使用缓动函数计算当前应该显示的数字
        const easedProgress = easeOutCubic(progress)
        const currentNumber = getNumberAtProgress(displayedNumber.value, targetNumber.value, easedProgress)
        displayedNumber.value = currentNumber
        
        // 如果滚动完成或超过总时间
        if (progress >= 1 || elapsed >= totalDuration.value) {
          clearInterval(rollTimer)
          displayedNumber.value = targetNumber.value
          isRolling.value = false
          
        }
      }, slowSpeed)
    }
  }, fastSpeed.value)
}

// 计算从当前数字到目标数字的距离（考虑循环）
const getRemainingDistance = (current, target) => {
  if (current === target) return 0
  
  // 计算正向距离
  const forwardDistance = target > current ? target - current : (props.max - current + target)
  
  // 计算反向距离（如果正向距离大于一半，反向可能更短）
  const backwardDistance = current > target ? current - target : (props.max - target + current)
  
  // 返回较短的距离
  return Math.min(forwardDistance, backwardDistance)
}

// 根据剩余距离和可用时间计算减速阶段的滚动速度
const calculateSlowSpeed = (distance, availableTime) => {
  // 确保至少有一定的滚动间隔
  const minInterval = 100 // 最小间隔100ms
  const maxInterval = 300 // 最大间隔300ms
  
  if (distance === 0) return maxInterval
  
  // 计算平均间隔时间
  const avgInterval = availableTime / distance
  
  // 限制在最小和最大值之间
  return Math.max(minInterval, Math.min(avgInterval, maxInterval))
}

// 缓动函数 - 三次方缓出（先快后慢）
const easeOutCubic = (t) => {
  return 1 - Math.pow(1 - t, 3)
}

// 根据进度获取当前应该显示的数字
const getNumberAtProgress = (start, target, progress) => {
  if (progress >= 1) return target
  
  const forwardDistance = target > start ? target - start : (props.max - start + target)
  const backwardDistance = start > target ? start - target : (props.max - target + start)
  
  // 选择较短路径
  if (forwardDistance <= backwardDistance) {
    // 正向滚动
    let result = start + forwardDistance * progress
    if (result > props.max) result -= props.max
    return Math.round(result)
  } else {
    // 反向滚动
    let result = start - backwardDistance * progress
    if (result < 1) result += props.max
    return Math.round(result)
  }
}


// 重置滚动
const resetRolling = () => {
  if (rollTimer) {
    clearInterval(rollTimer)
    rollTimer = null
  }
  displayedNumber.value = 0
  isRolling.value = false
}

defineExpose({
  startRolling,
  resetRolling
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (rollTimer) clearInterval(rollTimer)
})
</script>

<style>
.rolling-box {
  width: 68rpx;
  height: 68rpx;
  border: 6rpx solid #007aff;
  border-radius: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  transition: all 0.3s ease;
}

.number-text {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  font-family: 'Courier New', monospace;
}
</style>