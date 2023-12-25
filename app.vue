<template>
  <div>
    <TheHeader />

    <div class="container">
      <NuxtPage />
      <icon-shevron
        class="shevron"
        v-if="showScrollToTop"
        @click="scrollToTop"
      />
    </div>

    <the-footer />
  </div>
</template>

<script setup>
import TheHeader from "~/components/Block/TheHeader";
import IconShevron from "./assets/icon/IconShevron.vue";
import TheFooter from "~/components/Block/TheFooter";

import useScrollToTop from "./utils/useScrollToTop";

const { showScrollToTop, scrollToTop } = useScrollToTop();
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
  position: relative;
}
.shevron {
  position: fixed;
  top: 600px;
  right: 25px;
  fill: rgba(130, 100, 45, 1);
  z-index: 15;
}
@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}
</style>
