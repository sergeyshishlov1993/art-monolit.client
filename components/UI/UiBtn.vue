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
  border: 1px solid rgba(0, 0, 0, 1);
}
</style>
