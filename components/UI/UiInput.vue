<template>
  <input
    :type="props.type"
    :placeholder="props.placeholder"
    :value="props.value"
  />
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
input {
  padding: 12px 0 12px 24px;
  background: white;
  border-radius: 20px;
  border: 1px solid black;
}
</style>
