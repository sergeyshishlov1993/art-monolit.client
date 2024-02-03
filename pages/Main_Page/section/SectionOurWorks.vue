<template>
  <div class="wrapper" @click="showZoomImg = false">
    <ui-text-h1 class="white">НАШІ РАБОТИ</ui-text-h1>

    <div class="work-card">
      <div class="sceletor" v-if="isLoadingImg"></div>

      <img
        v-for="img in ourWorkStatic"
        :key="img"
        :src="getImageUrl(img)"
        alt="our works img"
        loading="lazy"
        @load="isLoadingImg = false"
        @click.stop="getZoomPath(getImageUrl(img))"
      />
      <zoom-img v-if="showZoomImg && screenWidth > 991" class="zoom" />
    </div>

    <ui-btn class="button">
      <ui-text-h3 class="white" @click="$router.push('/our_works')"
        >ПЕРЕГЛЯНУТИ ГАЛЕРЕЮ</ui-text-h3
      >
    </ui-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCatalogData } from "~/stores/catalogData";
const { getPathZoomImg } = useCatalogData();
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiBtn from "~/components/UI/UiBtn.vue";
import ZoomImg from "~/components/Block/ZoomImg.vue";

const isLoadingImg = ref(true);
const showZoomImg = ref(false);
const screenWidth = ref(window.innerWidth);

const ourWorkStatic = [
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp",
  "7.webp",
  "8.webp",
];

const getImageUrl = (img) => {
  const imageUrl = new URL(`/assets/img/ourWork/${img}`, import.meta.url).href;
  return imageUrl;
};

const getZoomPath = (path) => {
  showZoomImg.value = true;
  getPathZoomImg(path);
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  background: #000;
}

.work-card {
  position: relative;
  padding: 90px 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
}

.spinner-border {
  display: block;
  margin: auto;
  margin-top: 50px;
  color: white;
}

.sceletor {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80%;
  height: 320px;
  border-radius: 20px;
  background: #000;
  animation: loading 1.5s infinite;
  z-index: 1;
}

@keyframes loading {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}
.white {
  text-align: center;
  color: white;
}

.button {
  margin-top: 100px;
  min-width: 300px;
  align-self: center;
  border: 1px solid white;

  &:hover {
    background: white;
    h2 {
      color: #000;
      font-weight: 500;
    }
  }
}
@media screen and (max-width: 1199px) {
  .work-card {
    grid-template-columns: repeat(2, 1fr);
  }

  .button {
    margin-top: 75px;
    min-width: 250px;
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 100px 20px;
  }

  .work-card {
    padding: 60px 20px;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
  }
}
</style>
