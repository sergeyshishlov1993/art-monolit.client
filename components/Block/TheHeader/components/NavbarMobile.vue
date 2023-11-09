<template>
  <div class="wrapper">
    <ui-text-h3 class="white mt-15"
      ><nuxt-link to="#">каталог</nuxt-link></ui-text-h3
    >
    <ui-text-h3 class="white mt-15"
      ><nuxt-link :to="linkToSection('about')">про нас</nuxt-link></ui-text-h3
    >
    <ui-text-h3 class="white mt-15"
      ><nuxt-link to="#">наші работи</nuxt-link></ui-text-h3
    >
    <ui-text-h3 class="white mt-15"
      ><nuxt-link :to="linkToSection('map')"
        >як нас знайти</nuxt-link
      ></ui-text-h3
    >

    <div class="mt-25">
      <a href="+380508520594">
        <ui-text-h3 class="white">+380-50-852-05-94</ui-text-h3>
      </a>

      <a href="+380508520590">
        <ui-text-h3 class="white">+380-50-852-05-90</ui-text-h3>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import UiTextH3 from "~/components/UI/UiTextH3";

const route = useRoute();
const emit = defineEmits(["closeMenu"]);

function linkToSection(section) {
  const currentPath = route.path;
  emit("closeMenu");
  return currentPath == "/"
    ? { path: "/", hash: `#${section}` }
    : "/" && { path: "/", hash: `#${section}` };
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: solid 1px #82642d;
  z-index: 20;
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

.mt-15 {
  margin-top: 15px;
}
.mt-25 {
  margin-top: 25px;
}
</style>
