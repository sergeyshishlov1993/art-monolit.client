<template>
  <h2>
    <slot />
  </h2>
</template>

<script setup></script>

<style lang="scss" scoped>
h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 300;
}

@media screen and (max-width: 1199px) {
  h2 {
    font-size: 17px;
  }
}
@media screen and (max-width: 1023px) {
  h2 {
    font-size: 15px;
  }
}
</style>
