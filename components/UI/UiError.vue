<template>
  <span>
    <h2>
      {{ props.text }}
    </h2>
  </span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
h2 {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: rgb(255, 189, 189);
  text-align: left;
}
</style>
