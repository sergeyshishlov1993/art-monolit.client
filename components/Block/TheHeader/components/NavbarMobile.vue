<template>
  <div class="wrapper">
    <ui-text-h3 class="white"
      ><nuxt-link @click="goToCatalog" style="cursor: pointer"
        >каталог</nuxt-link
      >
    </ui-text-h3>
    <ui-text-h3 class="white"
      ><nuxt-link :to="linkToSection('about')">про нас</nuxt-link></ui-text-h3
    >
    <ui-text-h3 class="white"
      ><nuxt-link to="/our_works">наші работи</nuxt-link></ui-text-h3
    >
    <ui-text-h3 class="white"
      ><nuxt-link :to="linkToSection('map')"
        >як нас знайти</nuxt-link
      ></ui-text-h3
    >

    <div class="wrapper__phone">
      <a href="tel:380508520594">
        <ui-text-h3 class="white">+380-50-852-05-94</ui-text-h3>
      </a>

      <a href="tel:380508520590">
        <ui-text-h3 class="white">+380-50-852-05-90</ui-text-h3>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCatalogData } from "~/stores/catalogData";
import UiTextH3 from "~/components/UI/UiTextH3.vue";

const route = useRoute();
const router = useRouter();
const { changeTab } = useCatalogData();
const emit = defineEmits(["closeMenu"]);

function linkToSection(section) {
  const currentPath = route.path;

  emit("closeMenu");

  return currentPath === "/"
    ? { path: "/", hash: `#${section}` }
    : { path: "/", hash: `#${section}` };
}

function goToCatalog() {
  changeTab("single");
  return router.push(`/catalog?pixel=${route.query.pixel}`);
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-top: solid 1px #82642d;
  z-index: 20;

  &__phone {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
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
</style>
