<template>
  <div class="work-item">
    <div class="sceletor"></div>
    <img :src="props.src" :alt="props.number" loading="lazy" />

    <div class="number">
      <ui-text-h1 class="white">{{ props.number }}</ui-text-h1>
    </div>
  </div>
</template>

<script setup>
import UiTextH1 from "~/components/UI/UiTextH1.vue";

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

.number {
  position: absolute;
  bottom: 10px;
  left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(1, 0, 2, 1);
  min-width: 50px;
  min-height: 50px;
  border-radius: 30px;
}

.white {
  color: white;
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
