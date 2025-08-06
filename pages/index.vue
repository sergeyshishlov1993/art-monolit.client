<template>
  <div>
    <noscript>
      <img
        height="1"
        width="1"
        style="display: none"
        src="https://www.facebook.com/tr?id=2021575691610536&ev=PageView&noscript=1"
      />
    </noscript>

    <section-main-scrin />
    <section-catalog-preview />
    <section-our-works />
    <section-about id="about" />
    <section-contact id="form" />
    <section-map id="map" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SectionMainScrin from "./Main_Page/section/SectionMainScrin.vue";
import SectionCatalogPreview from "./Main_Page/section/SectionCatalogPreview.vue";
import SectionOurWorks from "./Main_Page/section/SectionOurWorks.vue";
import SectionAbout from "./Main_Page/section/SectionAbout.vue";
import SectionContact from "./Main_Page/section/SectionContact.vue";
import SectionMap from "./Main_Page/section/SectionMap.vue";

const imageUrl = new URL(`/assets/img/aboutOur.webp`, import.meta.url).href;
const mapSection = ref(null);

useHead({
  title:
    "Памятники Запорожье - Гранитные Памятники Запорожье - Купить памятники одинарный Запорожье - Двойные памятники в Запорожье - Памятники под ключ с установкой - Цена на памятники в Запорожье - Арт Монолит - Памятники Запорожье - Памятники на могилу Запорожье - Гранитные памятники Запорожье - Изготовление Памятников Запорожье  - [Памятники Запороржье]",
  meta: [
    {
      name: "robots",
      content: "index, follow",
    },
  ],

  script: [
    {
      src: "//www.googletagmanager.com/gtag/js?id=G-5LE543317L",
      async: true,
    },

    {
      innerHTML: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-5LE543317L');
          `,
    },

    {
      src: "https://www.googletagmanager.com/gtag/js?id=AW-16457131804",
      async: true,
    },

    {
      innerHTML: `
              window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'AW-16457131804');`,
    },


    {
      name: "facebook-domain-verification",
      content: "2yjcqfjbbbf03oiqfngtlkweldzmpy",
    },

    {
      name: "google-site-verification",
      content: "x3lktmFtn_dq-e5JemJe2aVqSQs3F8t5ttEtM_Lio9k",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
