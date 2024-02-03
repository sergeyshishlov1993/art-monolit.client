<template>
  <div class="card__wrapper">
    <div class="sceletor" v-if="isLoadingImg"></div>
    <img
      :src="props.src.stringValue"
      :alt="props.number"
      loading="lazy"
      @load="isLoadingImg = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  src: {
    type: Object,
    requred: true,
  },
});

const isLoadingImg = ref(true);
</script>

<style lang="scss" scoped>
.card__wrapper {
  position: relative;
  box-shadow: -13px -3px 19px -2px rgba(0, 0, 0, 0.86);
  border-radius: 20px;
}

img {
  width: 100%;
  height: 100%;
  min-height: 500px;
  border-radius: 10px;
  object-fit: cover;
}

.sceletor {
  position: absolute;
  width: 100%;
  height: auto;
  min-height: 500px;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  animation: loading 1.5s infinite;
  z-index: 0;
}

@keyframes loading {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
