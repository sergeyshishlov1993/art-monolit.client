<template>
  <div class="card__wrapper">
    <div class="sceletor" v-if="isLoadingImg"></div>
    <img
      :src="props.src.stringValue"
      :alt="props.number"
      loading="lazy"
      @load="isLoadingImg = false"
    />
    <!-- <div
      :style="{
        backgroundImage: 'url(' + props.src.stringValue + ')',
        width: '100%',
        height: '500px',
        backgroundSize: 'cover',
        borderRadius: '20px',
      }"
    ></div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  src: {
    type: String,
    requred: true,
  },

  number: {
    type: Number,
    requred: true,
  },
});

const isLoadingImg = ref(true);
</script>

<style lang="scss" scoped>
.card__wrapper {
  position: relative;
  box-shadow: 6px 5px 8px 7px rgba(34, 60, 80, 0.2);
  border-radius: 20px;
}

img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
}

.sceletor {
  width: 100%;
  min-height: 400px;
  max-height: 100%;
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
