<template>
  <div class="card__wrapper">
    <img :src="props.src" :alt="props.number" />

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
    requred: true,
  },

  number: {
    type: Number,
    requred: true,
  },
});
</script>

<style lang="scss" scoped>
.card__wrapper {
  position: relative;
}
.number {
  position: absolute;
  bottom: 10px;
  left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #000;
  border-radius: 100%;
  width: 40px;
}
.white {
  color: white;
}
</style>
