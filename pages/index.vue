<template>
  <div>
    <section-main-scrin />
    <section-catalog-preview />
    <section-our-works />
    <section-about id="about" />
    <section-contact />
    <section-map id="map" />
  </div>
</template>

<script setup>
import SectionMainScrin from "./Main_Page/section/SectionMainScrin.vue";
import SectionCatalogPreview from "./Main_Page/section/SectionCatalogPreview.vue";
import SectionOurWorks from "./Main_Page/section/SectionOurWorks.vue";
import SectionAbout from "./Main_Page/section/SectionAbout.vue";
import SectionContact from "./Main_Page/section/SectionContact.vue";
import SectionMap from "./Main_Page/section/SectionMap.vue";

const imageUrl = new URL(`/assets/img/catalog/1.webp`, import.meta.url).href;

useHead({
  title: "АРТ - МОНОЛІТ",
  meta: [
    {
      hid: "description-page",
      name: "description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "keywords-page",
      name: "keywords",
      content:
        "купить мраморные и гранитные памятники, памятники Запорожье, гранитные памятники, купить гранитный памятник в Запорожье, красивые надгробные памятники, качественые надгробные памятники в запорожье, памятники под ключ, памятники под ключ в запорожье, одинарные памятники, двойные памятники,одинарные памятники в Запорожье , двойные памятники в Запорожье, бюджетыне гранитные памятники в запорожье купить, пам'ятники для військових, пам'ятники для військових купити в запоріжжі, памятники гранитные запорожье, гранитная ваза купить в запорожье, гранитные памятники запорожье, памятники из мрамора запорожье, гранитные памятники запорожье цена, памятники на кладбище святого николая запорожье цены  ",
    },

    {
      hid: "og:title-page",
      property: "og:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "og:description-page",
      property: "og:description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "og:image-page",
      property: "og:image",
      content: imageUrl,
    },
    {
      hid: "og:url-page",
      property: "og:url",
      content: imageUrl,
    },
    {
      hid: "og:type-page",
      property: "og:type",
      content: "website",
    },
    {
      hid: "twitter:card-page",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title-page",
      name: "twitter:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "twitter:description-page",
      name: "twitter:description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "twitter:image-page",
      name: "twitter:image",
      content: "assets/img/mainBg.webp",
    },
    {
      hid: "twitter:url-page",
      name: "twitter:url",
      content: "assets/img/mainBg.webp",
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
  ],
});
</script>

<style lang="scss" scoped></style>
