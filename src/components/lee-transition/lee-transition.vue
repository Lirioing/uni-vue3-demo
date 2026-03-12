<!-- components/BaseTransition.vue -->
<template>
  <transition
    :name="transitionName"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot v-if="show"></slot>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'fade', // fade, slide-up, slide-down, slide-left, slide-right, zoom
  },
  duration: {
    type: Number,
    default: 300
  },
  delay: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave']);

const transitionName = computed(() => `custom-${props.type}`);

const beforeEnter = (el) => {
  emit('before-enter', el);
};

const enter = (el, done) => {
  emit('enter', el, done);
  setTimeout(done, props.duration);
};

const afterEnter = (el) => {
  emit('after-enter', el);
};

const beforeLeave = (el) => {
  emit('before-leave', el);
};

const leave = (el, done) => {
  emit('leave', el, done);
  setTimeout(done, props.duration);
};

const afterLeave = (el) => {
  emit('after-leave', el);
};
</script>

<style>
/* 淡入淡出效果 */
.custom-fade-enter-active,
.custom-fade-leave-active {
  transition: opacity v-bind('duration + "ms"') ease v-bind('delay + "ms"');
}

.custom-fade-enter-from,
.custom-fade-leave-to {
  opacity: 0;
}

/* 上滑效果 */
.custom-slide-up-enter-active,
.custom-slide-up-leave-active {
  transition: all v-bind('duration + "ms"') ease v-bind('delay + "ms"');
}

.custom-slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.custom-slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 下滑效果 */
.custom-slide-down-enter-active,
.custom-slide-down-leave-active {
  transition: all v-bind('duration + "ms"') ease v-bind('delay + "ms"');
}

.custom-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.custom-slide-down-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 左滑效果 */
.custom-slide-left-enter-active,
.custom-slide-left-leave-active {
  transition: all v-bind('duration + "ms"') ease v-bind('delay + "ms"');
}

.custom-slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.custom-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* 右滑效果 */
.custom-slide-right-enter-active,
.custom-slide-right-leave-active {
  transition: all v-bind('duration + "ms"') ease v-bind('delay + "ms"');
}

.custom-slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.custom-slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 缩放效果 */
.custom-zoom-enter-active,
.custom-zoom-leave-active {
  transition: all v-bind('duration + "ms"') ease v-bind('delay + "ms"');
}

.custom-zoom-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.custom-zoom-leave-to {
  opacity: 0;
  transform: scale(1.5);
}
</style>