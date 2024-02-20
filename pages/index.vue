<template>
  <div>
    <Head>
      <Meta
        name="description"
        content="виготовлення і встановлення пам'ятників в Запоріжжі, виготовлення під ключ за 30 днів, біля 3000 задовелених кліентів, Наша гранітна майстерня, вже багато років (з 2007 року), вважається однією з найкращих у м. Запоріжжя. Ми пропонуємо вашій увазі надгробні пам’ятники із граніту, а також виготовляємо із бетону. Наші вироби відомі найвищою якістю, доступною ціною і багаторічною гарантією, виготовлення памʼятників для військовослужбовців, велике різноманіття одинарних, подвійних памʼятників, телефон для довідок +380-50-852-05-94"
      />

      <Meta
        name="keywords"
        content="купить мраморные и гранитные памятники, памятники Запорожье, гранитные памятники, купить гранитный памятник в Запорожье, красивые надгробные памятники, качественые надгробные памятники в запорожье, памятники под ключ, памятники под ключ в запорожье, одинарные памятники, двойные памятники,одинарные памятники в Запорожье , двойные памятники в Запорожье, бюджетыне гранитные памятники в запорожье купить, пам'ятники для військових, пам'ятники для військових купити в запоріжжі, памятники гранитные запорожье, гранитная ваза купить в запорожье, гранитные памятники запорожье, памятники из мрамора запорожье, гранитные памятники запорожье цена, памятники на кладбище святого николая запорожье цены  "
      />
      <Meta property="og:title" content="АРТ - МОНОЛІТ" />

      <Meta
        property="og:description"
        content="виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье"
      />

      <Meta property="og:image" :content="imageUrl" />

      <Meta property="og:url" :content="imageUrl" />

      <Meta property="og:image:width" content="800px" />

      <Meta property="og:image:height" content="800px" />

      <Meta property="og:type" content="website" />
    </Head>

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

const imageUrl = new URL(`/assets/img/aboutOur.webp`, import.meta.url).href;

useHead({
  title:
    "Купить памятники одинарный запорожье - двойные памятники в запорожье - памятники под ключ с установкой - цена на памятники в запорожье - арт монолит",
  meta: [
    {
      name: "robots",
      content: "index, follow",
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
  ],
});
</script>

<style lang="scss" scoped></style>
