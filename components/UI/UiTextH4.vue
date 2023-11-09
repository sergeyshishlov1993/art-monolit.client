<template>
  <h2>
    <slot />
  </h2>
</template>

<script setup></script>

<style lang="scss" scoped>
h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
}

@media screen and (max-width: 767px) {
  h2 {
    font-size: 13px;
  }
}
</style>
