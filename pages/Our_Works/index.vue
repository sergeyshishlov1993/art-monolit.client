<template>
  <div class="container">
    <div class="our__works">
      <div class="navigation">
        <nuxt-link to="/">
          <ui-text-h4 class="fw-500">головна</ui-text-h4>
        </nuxt-link>

        <ui-text-h4 class="fw-500">/наші роботи</ui-text-h4>
      </div>

      <ui-text-h1 class="center mt-100">НАШІ РОБОТИ</ui-text-h1>

      <div class="wrapper">
        <div class="our-work__wrapper">
          <div class="tab mr-100">
            <tabs-page :selectedTab="activeTab[0]" @selecTab="selecChangeTab" />
          </div>

          <div class="our-work__wrapper__card">
            <work-card
              v-for="(work, index) in product"
              :key="work"
              :src="work.src"
              :alt="work.alt"
              :number="index + 1"
            />
          </div>
        </div>

        <div class="pagination">
          <ui-btn
            class="mr-20 button"
            @click="getPrevData('ourWork', 'product')"
            >ПОВЕРНУТИСЯ</ui-btn
          >
          <ui-btn class="button" @click="getNextData('ourWork', 'product')"
            >ПОКАЗАТИ ЩЕ</ui-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import TabsPage from "../Catalog/components/TabsPage.vue";
import WorkCard from "./components/WorkCard.vue";

const { activeTab, changeTab, product, getData, getNextData, getPrevData } =
  useCatalogData();
const isLoading = ref(false);

onMounted(async () => {
  await getData("ourWork", "product");

  isLoading.value = true;
});

function selecChangeTab(tab) {
  changeTab(tab);
  getData("ourWork", "product");
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 100px;
}
.our__works {
  padding: 75px 50px;
}
.our-work__wrapper {
  padding-top: 100px;
  display: flex;
  &__card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-auto-columns: auto;
    gap: 10px;
  }
}
.navigation {
  display: flex;
  a {
    color: inherit;
  }
}

.pagination {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  &:hover {
    background: #000;
    color: white;
  }
}
.mr-20 {
  margin-right: 20px;
}

.center {
  text-align: center;
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
  .our-work__wrapper {
    justify-content: space-around;
  }
  .wrapper__card {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1199px) {
  .wrapper__card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1023px) {
  .our-work__wrapper {
    padding-top: 50px;
    display: block;
  }
  .mr-100 {
    margin-right: 0;
  }

  .mt-100 {
    margin-top: 50px;
  }
}

@media screen and (max-width: 767px) {
  .our__works {
    padding: 70px 0;
  }
}
</style>
