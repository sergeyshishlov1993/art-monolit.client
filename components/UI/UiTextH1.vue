<template>
  <h2>
    <slot />
  </h2>
</template>

<script setup></script>

<style lang="scss" scoped>
h2 {
  margin: 0;
  font-size: 33px;
  font-weight: 700;
}

@media screen and (max-width: 767px) {
  h2 {
    font-size: 25px;
    font-weight: 500;
  }
}
</style>
