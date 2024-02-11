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

      <div class="wrapper" @click="showZoomImg = false">
        <div class="our-work__wrapper">
          <div class="tab mr-100">
            <tabs-page
              :selectedTab="activeTab[0]"
              @selecTab="changeSelectTab"
            />
          </div>

          <div
            class="our-work__wrapper__card"
            :class="{ double: activeTab[0] === 'double' }"
            v-if="isLoading"
          >
            <work-card
              v-for="work in pagedData"
              :key="work"
              :src="work.src"
              :alt="work.alt"
              :current-tab="activeTab"
              @click.stop="getZoomPath(work.src.stringValue)"
              id="ourWork"
            />

            <zoom-img v-if="showZoomImg && screenWidth > 991" class="zoom" />
          </div>

          <div class="spinner-border" role="status" v-else></div>
        </div>

        <the-pagination idBlock="ourWork" />
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
import ZoomImg from "~/components/Block/ZoomImg.vue";
import ThePagination from "~/components/Block/ThePagination.vue";

const {
  activeTab,
  changeTab,
  getData,
  getPageItems,
  pagedData,
  getPathZoomImg,
} = useCatalogData();
const isLoading = ref(false);
const showZoomImg = ref(false);
const screenWidth = ref(window.innerWidth);

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

const getZoomPath = (path) => {
  showZoomImg.value = true;
  getPathZoomImg(path, "ourWork");
};

useHead({
  title: "НАШІ РОБОТИ",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },

    {
      hid: "keywords",
      name: "keywords",
      content:
        "купить мраморные и гранитные памятники, памятники Запорожье, гранитные памятники, купить гранитный памятник в Запорожье, красивые надгробные памятники, качественые надгробные памятники в запорожье, памятники под ключ, памятники под ключ в запорожье, одинарные памятники, двойные памятники,одинарные памятники в Запорожье , двойные памятники в Запорожье, бюджетыне гранитные памятники в запорожье купить, пам'ятники для військових, пам'ятники для військових купити в запоріжжі, памятники гранитные запорожье, гранитная ваза купить в запорожье, гранитные памятники запорожье, памятники из мрамора запорожье, гранитные памятники запорожье цена, памятники на кладбище святого николая запорожье цены  ",
    },

    {
      hid: "og:title",
      property: "og:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "og:description",
      property: "og:description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "/assets/img/ourWork/1.webp",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "/assets/img/ourWork/1.webp",
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: "/assets/img/ourWork/1.webp",
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: "/assets/img/ourWork/1.webp",
    },
  ],
});
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
  width: 100%;
  height: 100%;
  &__card {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-auto-rows: auto;
    gap: 30px;
  }
}

.double {
  grid-template-columns: repeat(2, 1fr);
}
.navigation {
  display: flex;
  a {
    color: inherit;
  }
}

.spinner-border {
  display: block;
  margin: auto;
}
.zoom {
  img {
    height: 75% !important;
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
    padding: 70px 20px;
  }
}
</style>
