<template>
  <h2>
    <slot />
  </h2>
</template>

<script setup></script>

<style lang="scss" scoped>
h2 {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

@media screen and (min-width: 1023px) {
  h2 {
    font-size: 17px;
  }
}
</style>
