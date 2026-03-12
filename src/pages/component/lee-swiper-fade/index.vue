<template>
  <lee-swiper-fade :list="swiperList" @tapItem="tapItem"></lee-swiper-fade>
</template>

<script setup>
import { ref } from 'vue';
const swiperList = ref([
  {
    textImg: "https://go.cdn.heytea.com/storage/product/2022/12/19/7e350accacfe49b29928f18a155e3abf.jpg",
    underImg: "https://go.cdn.heytea.com/storage/product/2023/05/25/8e0c39cc9ac74a2894a150fac38e9b97.jpg-app"
  }, {
    textImg: "https://go.cdn.heytea.com/storage/product/2024/06/01/258d94733aa849b58fbef417a8426434.jpg",
    underImg: "https://go.cdn.heytea.com/storage/product/2024/06/01/08a5ce539d8b491a927dddd536a9d6cf.jpg-app"
  }, {
    textImg: "https://go.cdn.heytea.com/storage/product/2024/05/10/09eaca1bf69a4671a8502b9d7c8a0057.jpg",
    underImg: "https://go.cdn.heytea.com/storage/product/2024/04/21/1dab4495f3354340b51499590aeffddb.jpg-app"
  }, {
    textImg: "https://go.cdn.heytea.com/storage/product/2024/06/10/ba63ce2a3d0e43cc8f5173810c335986.jpg",
    underImg: "https://go.cdn.heytea.com/storage/product/2024/06/10/e1bc5d44ea4b40be847b3828fafa260b.jpg-app"
  }, {
    textImg: "https://go.cdn.heytea.com/storage/product/2024/05/28/07206a78c5864d0abb0b61372c6fb082.jpg",
    underImg: "https://go.cdn.heytea.com/storage/product/2024/05/28/fc8a061479f54c6484246523b18d01b5.jpg-app"
  }
])
// swiper-item的点击事件
const tapItem = (item) => {
  console.log(item, "tapItem")
}
</script>

<style lang="scss" scoped>
</style>