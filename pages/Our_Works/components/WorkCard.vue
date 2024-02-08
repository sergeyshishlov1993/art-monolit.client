<template>
  <div class="card__wrapper">
    <img :src="props.src.stringValue" :alt="props.number" loading="lazy" />
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: Object,
    requred: true,
  },
});
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
  min-height: 350px;
  border-radius: 10px;
  object-fit: cover;
}
</style>
