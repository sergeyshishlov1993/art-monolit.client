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

useHead({
  title: "АРТ - МОНОЛІТ",
  meta: [
    {
      name: "description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      name: "keywords",
      content:
        "купить мраморные и гранитные памятники, памятники Запорожье, гранитные памятники, купить гранитный памятник в Запорожье, красивые надгробные памятники, качественые надгробные памятники в запорожье, памятники под ключ, памятники под ключ в запорожье, одинарные памятники, двойные памятники,одинарные памятники в Запорожье , двойные памятники в Запорожье, бюджетыне гранитные памятники в запорожье купить, пам'ятники для військових, пам'ятники для військових купити в запоріжжі, памятники гранитные запорожье, гранитная ваза купить в запорожье, гранитные памятники запорожье, памятники из мрамора запорожье, гранитные памятники запорожье цена, памятники на кладбище святого николая запорожье цены  ",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
