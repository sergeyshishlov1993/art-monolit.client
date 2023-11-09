<template>
  <div class="container">
    <div class="catalog">
      <div class="navigation">
        <nuxt-link to="/">
          <ui-text-h4 class="fw-500">головна</ui-text-h4> </nuxt-link
        >/<ui-text-h4 class="fw-500">каталог</ui-text-h4>
      </div>

      <ui-text-h1 class="center mt-100">КАТАЛОГ</ui-text-h1>

      <div class="wrapper">
        <div class="btns mr-100">
          <ui-btn :class="{ active: selectTab === 'single' }">
            <ui-text-h4>одинарні</ui-text-h4>
          </ui-btn>

          <ui-btn :class="{ active: selectTab === 'double' }">
            <ui-text-h4>двійні</ui-text-h4>
          </ui-btn>

          <ui-btn :class="{ active: selectTab === 'kids' }">
            <ui-text-h4>дитячі</ui-text-h4>
          </ui-btn>

          <ui-btn :class="{ active: selectTab === 'concrete' }">
            <ui-text-h4>бетоні</ui-text-h4>
          </ui-btn>

          <ui-btn :class="{ active: selectTab === 'marble' }">
            <ui-text-h4>меморіальні комплекси</ui-text-h4>
          </ui-btn>

          <ui-btn :class="{ active: selectTab === 'accessories' }">
            <ui-text-h4>аксесуари</ui-text-h4>
          </ui-btn>
        </div>
        <div class="catalogs">
          <catalog-card v-for="card in 20" :key="card" class="mr-20 mb-20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useCatalogData } from "~/stores/catalogData";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import UiBtn from "~/components/UI/UiBtn";
import CatalogCard from "./components/CatalogCard";

const { catalogData } = useCatalogData();
const route = useRoute();
const selectTab = ref("single");

function test() {
  return (selectTab.value = route.params.id);
}
test();

const props = defineProps({
  activeTab: {
    type: String,
    requred: true,
  },
});
</script>

<style lang="scss" scoped>
.catalog {
  padding-top: 100px;
}
.navigation {
  display: flex;
  margin-left: 50px;
  a {
    color: inherit;
  }
}

.wrapper {
  padding: 108px 50px 50px 50px;
  display: flex;
  align-items: flex-start;
  .catalogs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}

.btns {
  display: flex;
  flex-direction: column;
  button {
    width: 250px;
    margin-bottom: 18px;
    &:hover {
      background: #000;
      color: white;
      border: 1px solid black;
    }
  }
}

.active {
  background: #000;
  color: white;
  border: 1px solid black;
}

.fw-500 {
  font-weight: 500;
}
.center {
  text-align: center;
}

.mr-20 {
  margin-right: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
.mr-100 {
  margin-right: 100px;
}
.mt-100 {
  margin-top: 100px;
}

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}
</style>
