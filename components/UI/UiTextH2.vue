<template>
  <h2>
    <slot />
  </h2>
</template>

<script setup></script>

<style lang="scss" scoped>
h2 {
  margin: 0;
  font-size: 27px;
  font-weight: 300;
}

@media screen and (max-width: 1025px) {
  h2 {
    font-size: 17px;
  }
}


@media screen and (max-width: 767px) {
  h2 {
    font-weight: 300;
  }
}
</style>
