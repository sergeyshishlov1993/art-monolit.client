<template>
  <div class="container">
    <div class="catalog">
      <div class="navigation">
        <nuxt-link to="/">
          <ui-text-h4 class="fw-500">головна</ui-text-h4>
        </nuxt-link>

        <ui-text-h4 class="fw-500">/каталог</ui-text-h4>
      </div>

      <ui-text-h1 class="center mt-100">КАТАЛОГ</ui-text-h1>

      <div class="wrapper">
        <div class="wrapper__tab mr-100">
          <tabs-page :selectedTab="activeTab[0]" @selecTab="changeSelectTab" />
        </div>

        <div class="wrapper__catalog_card">
          <catalog-card
            v-for="(card, index) in filterCatalogData()"
            :key="card"
            :src="card.src"
            :alt="card.alt"
            :title="card.title"
            :description="card.description"
            class="mr-20 mb-20"
            @click="$router.push(`/catalog/${index}`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCatalogData } from "~/stores/catalogData";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import CatalogCard from "./components/CatalogCard";
import TabsPage from "./components/TabsPage.vue";

const { activeTab, changeTab, filterCatalogData } = useCatalogData();

function changeSelectTab(tab) {
  changeTab(tab);
}
</script>

<style lang="scss" scoped>
.catalog {
  padding: 75px 20px 20px 20px;
}
.navigation {
  display: flex;
  a {
    color: inherit;
  }
}

.wrapper {
  padding: 108px 50px 50px 50px;
  display: flex;
  align-items: flex-start;
  &__catalog_card {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
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

@media screen and (max-width: 1199px) {
  .wrapper {
    padding: 80px 20px 20px 20px;
    &__catalog_card {
      justify-content: center;
    }
  }

  .mr-20 {
    margin-right: 10px;
  }

  .mb-20 {
    margin-bottom: 10px;
  }
  .mr-100 {
    margin-right: 50px;
  }
}

@media screen and (max-width: 1023px) {
  .catalog {
    padding: 80px 20px 20px 20px;
  }
  .wrapper {
    display: block;
  }

  .mr-100 {
    margin: 0;
  }

  .mt-100 {
    margin-top: 50px;
  }
}

@media screen and (max-width: 768px) {
  .catalog {
    padding: 50px 0px 0px 0px;
  }
  .wrapper {
    padding: 40px 0px;
  }
}
</style>
