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
            <tabs-page
              :selectedTab="activeTab[0]"
              @selecTab="changeSelectTab"
            />
          </div>

          <div class="our-work__wrapper__card" v-if="isLoading">
            <work-card
              v-for="(work, index) in pagedData"
              :key="work"
              :src="work.src"
              :alt="work.alt"
              :number="index + 1"
            />
          </div>

          <div class="spinner-border" role="status" v-else></div>
        </div>

        <the-pagination />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCatalogData } from "~/stores/catalogData";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import TabsPage from "../Catalog/components/TabsPage.vue";
import WorkCard from "./components/WorkCard.vue";
import ThePagination from "~/components/Block/ThePagination.vue";

const { activeTab, changeTab, getData, getPageItems, pagedData } =
  useCatalogData();
const isLoading = ref(false);

onMounted(async () => {
  await getData("ourWork", "product");
  getPageItems(1);

  isLoading.value = true;
});

async function changeSelectTab(tab) {
  changeTab(tab);

  isLoading.value = false;

  await getData("ourWork", "product");
  getPageItems(1);

  isLoading.value = true;
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    gap: 30px;
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
.active {
  background: #000;
  color: white;
}
.button {
  &:hover {
    background: #000;
    color: white;
  }
}
.page {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
}
.spinner-border {
  display: block;
  margin: auto;
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

@media screen and (max-width: 1440px) {
  .wrapper {
    padding: 50px;
  }

  .our-work__wrapper__card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1199px) {
  .wrapper__card {
    grid-template-columns: repeat(2, 1fr);
  }
  .our-work__wrapper {
    display: block;
  }
}

@media screen and (max-width: 1023px) {
  .our-work__wrapper {
    padding-top: 50px;
  }
  .mr-100 {
    margin-right: 0;
  }

  .mt-100 {
    margin-top: 50px;
  }
}

@media screen and (max-width: 991px) {
  .our-work__wrapper__card {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 0;
  }
  .our__works {
    padding: 70px 0;
  }
}
</style>
