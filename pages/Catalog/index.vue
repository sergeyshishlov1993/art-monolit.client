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
        <div class="catalog__wrapper">
          <div class="wrapper__tab mr-100">
            <tabs-page
              :selectedTab="activeTab[0]"
              @selecTab="changeSelectTab"
            />
          </div>

          <div class="catalog_card" v-if="isLoading">
            <catalog-card
              v-for="card in pagedData"
              :key="card"
              :src="card.src.stringValue"
              :alt="card.title.stringValue"
              :title="card.title.stringValue"
              :price="card.price.stringValue"
              class="mr-20 mb-20"
              @click="$router.push(`/catalog/${card.id}`)"
              id="catalog"
            />
          </div>

          <div class="spinner-border" role="status" v-else></div>
        </div>

        <the-pagination idBlock="catalog" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCatalogData } from "~/stores/catalogData";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import ThePagination from "~/components/Block/ThePagination.vue";
import CatalogCard from "./components/CatalogCard";
import TabsPage from "./components/TabsPage.vue";

const { activeTab, changeTab, getData, getPageItems, pagedData } =
  useCatalogData();
const isLoading = ref(false);
const imageUrl = new URL(`/assets/img/catalog/1.webp`, import.meta.url).href;

onMounted(async () => {
  await getData("catalog", "product");
  getPageItems(1);

  isLoading.value = true;
});

async function changeSelectTab(tab) {
  changeTab(tab);

  isLoading.value = false;

  await getData("catalog", "product");
  getPageItems(1);

  isLoading.value = true;
}

useHead({
  title: "КАТАЛОГ",
  meta: [
    {
      hid: "main-description",
      name: "description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },

    {
      hid: "main-keywords",
      name: "keywords",
      content:
        "купить мраморные и гранитные памятники, памятники Запорожье, гранитные памятники, купить гранитный памятник в Запорожье, красивые надгробные памятники, качественые надгробные памятники в запорожье, памятники под ключ, памятники под ключ в запорожье, одинарные памятники, двойные памятники,одинарные памятники в Запорожье , двойные памятники в Запорожье, бюджетыне гранитные памятники в запорожье купить, пам'ятники для військових, пам'ятники для військових купити в запоріжжі, памятники гранитные запорожье, гранитная ваза купить в запорожье, гранитные памятники запорожье, памятники из мрамора запорожье, гранитные памятники запорожье цена, памятники на кладбище святого николая запорожье цены  ",
    },

    {
      hid: "og:title-main",
      property: "og:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "og:description-main",
      property: "og:description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "og:image-main",
      property: "og:image",
      content: imageUrl,
    },
    {
      hid: "og:url-main",
      property: "og:url",
      content: imageUrl,
    },
    {
      hid: "og:type-main",
      property: "og:type",
      content: "website",
    },
    {
      hid: "twitter:card-main",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title-main",
      name: "twitter:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "twitter:description-main",
      name: "twitter:description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "twitter:image-main",
      name: "twitter:image",
      content: imageUrl,
    },
    {
      hid: "twitter:url-main",
      name: "twitter:url",
      content: imageUrl,
    },
  ],
});
</script>

<style lang="scss" scoped>
.catalog {
  padding: 75px 50px;
}
.navigation {
  display: flex;
  a {
    color: inherit;
  }
}

.wrapper {
  padding: 100px;
}
.catalog__wrapper {
  padding: 108px 50px 50px 50px;
  display: flex;
  align-items: flex-start;
}
.catalog_card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.spinner-border {
  display: block;
  margin: auto;
}
.mr-20 {
  margin-right: 20px;
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
@media screen and (max-width: 1440px) {
  .catalog_card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1199px) {
  .catalog__wrapper {
    display: block;
    padding: 80px 20px 20px 20px;
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
  .wrapper {
    padding: 0;
  }
  .catalog {
    padding: 80px 20px 20px 20px;
  }

  .mr-100 {
    margin: 0;
  }

  .mt-100 {
    margin-top: 50px;
  }
}

@media screen and (max-width: 768px) {
  .wrapper {
    padding: 20px;
  }
  .catalog {
    padding: 50px 0px 0px 0px;
  }
  .catalog__wrapper {
    padding: 40px 0px;
  }
  .catalog_card {
    grid-template-columns: 1fr;
  }
}
</style>
