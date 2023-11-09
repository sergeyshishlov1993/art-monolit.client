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
import SectionMainScrin from "./mainPage/section/SectionMainScrin";
import SectionCatalogPreview from "./mainPage/section/SectionCatalogPreview";
import SectionOurWorks from "./mainPage/section/SectionOurWorks";
import SectionAbout from "./mainPage/section/SectionAbout";
import SectionContact from "./mainPage/section/SectionContact.vue";
import SectionMap from "./mainPage/section/SectionMap.vue";
</script>

<style lang="scss" scoped></style>
