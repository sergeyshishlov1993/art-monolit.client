<template>
  <div class="work-item">
    <div class="sceletor"></div>
    <img :src="props.src" :alt="props.number" loading="lazy" />
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.work-item {
  position: relative;
}

.sceletor {
  position: absolute;
  width: 80%;
  height: 200px;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  animation: loading 1.5s infinite;
  z-index: 1;
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

img {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
</style>
