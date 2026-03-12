<template>
  <lee-lottery
    ref="lotteryRef"
    :prizeList="prizeList"
    :activityInfo="activityInfo"
    :joinInfo="joinInfo"
    @joinActivity="joinActivity"
    @openPrize="openPrize">
  </lee-lottery>
</template>

<script setup>
import { ref } from 'vue'
const prizeList = ref([
  {
    "name": "5折",
    "value": "5",
  },
  {
    "name": "拉布布",
    "value": "6",
  },
  {
    "name": "7折",
    "value": "7",
  },
  {
    "name": "吨吨桶",
    "value": "8",
  },
  {
    "name": "9折",
    "value": "9",
  },
  {
    "name": "公仔抵扣",
    "value": "10"
  }
]) // 奖品列表
const activityInfo = ref({
  rule: '抽奖大转盘活动规则'
}) // 活动信息
const joinInfo = ref({
  canJoinCount: 100, // 抽奖次数
  status: true, // 抽奖状态
}) // 抽奖信息
const prizeInfo = ref({}) // 中奖信息
const lotteryRef = ref(null)
// 开始抽奖
const joinActivity = () => {
  // 中奖信息在奖品列表中的下标
  const index = Math.round(Math.random() * (prizeList.value.length - 1))
  prizeInfo.value = prizeList.value[index]
  lotteryRef.value.playReward(index)
}
// 打开中奖弹框
const openPrize = () => {
  uni.showToast({
    title: `恭喜您获得${prizeInfo.value.name}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
</style>