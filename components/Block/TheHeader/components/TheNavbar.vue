<template>
  <div class="wrapper">
    <nuxt-link @click="goToCatalog" style="cursor: pointer">
      <ui-text-h3 class="white mr-50">каталог</ui-text-h3>
    </nuxt-link>

    <nuxt-link :to="linkToSection('about')">
      <ui-text-h3 class="white mr-50">про нас</ui-text-h3>
    </nuxt-link>

    <nuxt-link to="/our_works">
      <ui-text-h3 class="white mr-50">наші работи</ui-text-h3>
    </nuxt-link>

    <nuxt-link :to="linkToSection('map')">
      <ui-text-h3 class="white mr-50">як нас знайти</ui-text-h3>
    </nuxt-link>

    <div class="wrapper-phone">
      <icon-phone class="mr-10" />

      <div>
        <a href="tel:380508520594">
          <ui-text-h3 class="white">+380-50-852-05-94</ui-text-h3>
        </a>

        <a href="tel:380508520590" class="mt-10">
          <ui-text-h3 class="white">+380-50-852-05-90</ui-text-h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCatalogData } from "~/stores/catalogData";

import UiTextH3 from "~/components/UI/UiTextH3.vue";
import IconPhone from "~/assets/icon/IconPhone.vue";

const route = useRoute();
const router = useRouter();
const { changeTab } = useCatalogData();

function linkToSection(section) {
  const currentPath = route.path;
  return currentPath == "/"
    ? { path: "/", hash: `#${section}` }
    : "/" && { path: "/", hash: `#${section}` };
}

function goToCatalog() {
  changeTab("single");
  return router.push(`/catalog?pixel=${route.query.pixel}`);
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
  display: block;
}
.white {
  color: #ffffff;
  &:hover {
    background: linear-gradient(
      to bottom,
      #f2be5c 14%,
      #f2be5c 16%,
      #d99036 10%,
      #cfc09f 32%,
      #ffecb3 40%,
      #3a2c0f 99%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    color: transparent;
  }
}

.mt-10 {
  margin-top: 10px;
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
