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
              :type="card.type.stringValue"
              class="mr-20 mb-20"
              @click="
                $router.push(`/catalog/${card.id}?pixel=${$route.query.pixel}`)
              "
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
const imageUrl = new URL(`/assets/img/catalog/war.webp`, import.meta.url).href;

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
  title:
    "Памятника Запорожье - Гранитные Памятники Запорожье - Каталог одинарных памятников - Двойные памятников - Памятники для военых - Бюджетные и качественые памятники - Памятники под ключ запорожье",
  meta: [
    {
      hid: "main-description",
      name: "description",
      content:
        "Каталог з одинарними та подвійми пам'ятниками у місті Запоржжя, Пам'ятнки під ключ, Пам'ятники для військових, Меморіальні пам'ятники, Виготовлення пам'ятників під ключ к місті Запоріжжя",
    },

    {
      hid: "main-keywords",
      name: "keywords",
      content:
        "купити одинарні пам'ятники у Запоріжжі, купити подвійний пам'ятник у Запоріжжі,пам'ятник для військових, купить памятник одинарный, цена одинарного памятника запорожье, цена двойного памятника запорожье, установка памятников под ключ запорожье  ",
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
        "каталог з одинарними та подвійми пам'ятниками у місті Запоржжя, пам'ятнки під ключ, пам'ятники для військових, меморіальні пам'ятники, виготовлення пам'ятників під ключ к місті Запоріжжя",
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
  ],
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-CGMKTLYTRQ",
      async: true,
    },

    {
      innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CGMKTLYTRQ');
          `,
    },

    {
      innerHTML: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2021575691610536');
      fbq('track', 'PageView');
      `,
    },

    {
      name: "facebook-domain-verification",
      content: "2yjcqfjbbbf03oiqfngtlkweldzmpy",
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
