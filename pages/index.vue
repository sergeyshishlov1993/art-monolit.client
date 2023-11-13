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
import SectionMainScrin from "./Main_Page/section/SectionMainScrin";
import SectionCatalogPreview from "./Main_Page/section/SectionCatalogPreview";
import SectionOurWorks from "./Main_Page/section/SectionOurWorks";
import SectionAbout from "./Main_Page/section/SectionAbout";
import SectionContact from "./Main_Page/section/SectionContact.vue";
import SectionMap from "./Main_Page/section/SectionMap.vue";
</script>

<style lang="scss" scoped></style>
