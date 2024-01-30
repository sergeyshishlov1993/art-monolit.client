<template>
  <button>
    <slot />
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
button {
  padding: 15px;
  border-radius: 20px;
  box-shadow: 4px 9px 15px 1px rgba(34, 60, 80, 0.35);
  border: none;
}
</style>
