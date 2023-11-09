<template>
  <div class="wrapper">
    <nuxt-link to="catalogPage">
      <ui-text-h3 class="white mr-50">каталог</ui-text-h3>
    </nuxt-link>

    <nuxt-link :to="linkToSection('about')">
      <ui-text-h3 class="white mr-50">про нас</ui-text-h3>
    </nuxt-link>

    <nuxt-link to="#">
      <ui-text-h3 class="white mr-50">наші работи</ui-text-h3>
    </nuxt-link>

    <nuxt-link :to="linkToSection('map')">
      <ui-text-h3 class="white mr-50">як нас знайти</ui-text-h3>
    </nuxt-link>

    <div class="wrapper-phone">
      <icon-phone class="mr-10" />

      <div>
        <a href="+380508520594">
          <ui-text-h3 class="white">+380-50-852-05-94</ui-text-h3>
        </a>

        <a href="+380508520590">
          <ui-text-h3 class="white">+380-50-852-05-90</ui-text-h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

import UiTextH3 from "~/components/ui/UiTextH3";
import IconPhone from "~/assets/icon/IconPhone.vue";

const route = useRoute();

function linkToSection(section) {
  const currentPath = route.path;
  return currentPath == "/"
    ? { path: "/", hash: `#${section}` }
    : "/" && { path: "/", hash: `#${section}` };
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  &-phone {
    display: flex;
    align-items: flex-start;
    margin-left: 60px;
  }
}

a {
  color: inherit;
}
.white {
  color: #ffffff;
  &:hover {
    color: #82642d;
  }
}

.mr-10 {
  margin-right: 10px;
}

.mr-50 {
  margin-right: 50px;
}

@media screen and (min-width: 1023px) {
  .mr-50 {
    margin-right: 20px;
  }
}
</style>
