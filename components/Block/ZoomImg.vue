<template>
  <div>
    <img :src="zoomPathImg[0]" alt="" />
  </div>
</template>

<script setup>
import { useCatalogData } from "~/stores/catalogData";
const { zoomPathImg } = useCatalogData();
</script>

<style lang="scss" scoped>
div {
  padding: 40px;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  background: rgba(50, 50, 50, 0.5);
  z-index: 1;
}
img {
  display: block;
  margin: 0 auto;
  max-height: 100%;
  z-index: 4;
}
</style>
