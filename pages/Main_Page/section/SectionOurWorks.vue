<!--<template>-->
<!--  <div class="wrapper" @click="showZoomImg = false">-->
<!--    <ui-text-h1 class="white">НАШІ РАБОТИ</ui-text-h1>-->

<!--    <div class="work-card" id="mainOurWork">-->
<!--      <img-->
<!--        v-for="img in ourWorkStatic"-->
<!--        :key="img"-->
<!--        :src="getImageUrl(img)"-->
<!--        alt="our works img"-->
<!--        @click.stop="getZoomPath(getImageUrl(img))"-->
<!--        data-nosnippet-->
<!--      />-->

<!--      <zoom-img v-if="showZoomImg && screenWidth > 991" class="zoom" />-->
<!--    </div>-->

<!--    <ui-btn class="button">-->
<!--      <ui-text-h3 class="white" @click="$router.push('/our_works')"-->
<!--        >ПЕРЕГЛЯНУТИ ГАЛЕРЕЮ</ui-text-h3-->
<!--      >-->
<!--    </ui-btn>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, onBeforeUnmount, onUnmounted, nextTick } from "vue";-->
<!--import { useCatalogData } from "~/stores/catalogData";-->
<!--const { getPathZoomImg } = useCatalogData();-->
<!--import UiTextH1 from "~/components/UI/UiTextH1.vue";-->
<!--import UiTextH3 from "~/components/UI/UiTextH3.vue";-->
<!--import UiBtn from "~/components/UI/UiBtn.vue";-->
<!--import ZoomImg from "~/components/Block/ZoomImg.vue";-->

<!--const showZoomImg = ref(false);-->
<!--const screenWidth = ref(0);-->
<!--const imagesLoaded = ref(0);-->

<!--const ourWorkStatic = [-->
<!--  "1.webp",-->
<!--  "2.webp",-->
<!--  "3.webp",-->
<!--  "4.webp",-->
<!--  "5.webp",-->
<!--  "6.webp",-->
<!--  "7.webp",-->
<!--  "8.webp",-->
<!--];-->

<!--const getImageUrl = (img) => {-->
<!--  return `/ourWork/${img}`;-->
<!--};-->

<!--onMounted(() => {-->
<!--  if (typeof window !== "undefined") {-->
<!--    screenWidth.value = window.innerWidth;-->

<!--    const handleResize = () => {-->
<!--      screenWidth.value = window.innerWidth;-->
<!--    };-->

<!--    window.addEventListener("resize", handleResize);-->

<!--    onBeforeUnmount(() => {-->
<!--      window.removeEventListener("resize", handleResize);-->
<!--    });-->
<!--  }-->
<!--});-->

<!--const getZoomPath = (path) => {-->
<!--  showZoomImg.value = true;-->
<!--  getPathZoomImg(path, "mainOurWork");-->
<!--};-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.wrapper {-->
<!--  padding: 150px 50px;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  background: #000;-->
<!--}-->

<!--.work-card {-->
<!--  position: relative;-->
<!--  padding: 90px 50px;-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(4, 1fr);-->
<!--  gap: 50px;-->
<!--  min-height: 600px;-->

<!--  img {-->
<!--    width: 100%;-->
<!--    min-height: 500px;-->
<!--    max-height: 500px;-->
<!--    border-radius: 20px;-->
<!--  }-->
<!--}-->

<!--.spinner-border {-->
<!--  display: block;-->
<!--  margin: auto;-->
<!--  margin-top: 50px;-->
<!--  color: white;-->
<!--}-->

<!--.sceletor {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  bottom: 0;-->
<!--  width: 80%;-->
<!--  min-height: 600px;-->
<!--  border-radius: 20px;-->
<!--  background: #000;-->
<!--  animation: loading 1.5s infinite;-->
<!--  z-index: 1;-->
<!--}-->

<!--@keyframes loading {-->
<!--  0% {-->
<!--    opacity: 0.6;-->
<!--  }-->
<!--  50% {-->
<!--    opacity: 0.3;-->
<!--  }-->
<!--  100% {-->
<!--    opacity: 0.6;-->
<!--  }-->
<!--}-->
<!--.white {-->
<!--  text-align: center;-->
<!--  color: white;-->
<!--}-->

<!--.button {-->
<!--  margin-top: 100px;-->
<!--  min-width: 300px;-->
<!--  align-self: center;-->
<!--  border: 1px solid white;-->

<!--  &:hover {-->
<!--    background: white;-->
<!--    h2 {-->
<!--      color: #000;-->
<!--      font-weight: 500;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--@media screen and (max-width: 1199px) {-->
<!--  .work-card {-->
<!--    grid-template-columns: repeat(2, 1fr);-->
<!--  }-->

<!--  .button {-->
<!--    margin-top: 75px;-->
<!--    min-width: 250px;-->
<!--  }-->
<!--}-->

<!--@media screen and (max-width: 767px) {-->
<!--  .wrapper {-->
<!--    padding: 100px 20px;-->
<!--  }-->

<!--  .work-card {-->
<!--    padding: 60px 20px;-->
<!--    grid-template-columns: repeat(1, 1fr);-->
<!--    gap: 30px;-->
<!--  }-->
<!--}-->
<!--</style>-->


<template>
  <div class="wrapper">
    <ui-text-h1 class="white">НАШІ РОБОТИ</ui-text-h1>

    <div class="work-card" id="mainOurWork">
      <img
          v-for="img in ourWorkStatic"
          :key="img"
          :src="getImageUrl(img)"
          alt="our works img"
          loading="lazy"
          @click.stop.prevent="openZoom(img)"
      />
    </div>

    <ui-btn class="button">
      <ui-text-h3 class="white" @click="$router.push('/our_works')">
        ПЕРЕГЛЯНУТИ ГАЛЕРЕЮ
      </ui-text-h3>
    </ui-btn>

    <transition name="fade">
      <zoom-img
          v-if="showZoomImg"
          @close="showZoomImg = false"
          @openModal="openModal"
      />
    </transition>

    <transition name="fade">
      <div v-if="showModal" class="modal-wrapper">
        <modal-call-back
            currentPath="home-our-works"
            qwery="custom-calculation"
            @closeModal="showModal = false"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCatalogData } from "~/stores/catalogData";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiBtn from "~/components/UI/UiBtn.vue";
import ZoomImg from "~/components/Block/ZoomImg.vue";
import ModalCallBack from "~/components/Block/Modal/ModalCallBack.vue";

const { getPathZoomImg } = useCatalogData();
const showZoomImg = ref(false);
const showModal = ref(false);

const ourWorkStatic = [
  "1.webp", "2.webp", "3.webp", "4.webp",
  "5.webp", "6.webp", "7.webp", "8.webp",
];

const getImageUrl = (img: string) => `/ourWork/${img}`;

const openZoom = (img: string) => {
  const path = getImageUrl(img);
  showZoomImg.value = true;
  getPathZoomImg(path, "mainOurWork");
};

const openModal = () => {
  showZoomImg.value = false;
  showModal.value = true;
};

watch([showZoomImg, showModal], ([zoom, modal]) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = (zoom || modal) ? "hidden" : "";
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  background: #000;
  position: relative;
}

.work-card {
  position: relative;
  padding: 90px 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  min-height: 600px;

  img {
    width: 100%;
    min-height: 500px;
    max-height: 500px;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
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

/* Modal & Zoom Overlay */
.modal-wrapper {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.zoom-img-wrapper), :deep(.zoom) {
  z-index: 10000 !important;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media screen and (max-width: 1199px) {
  .work-card {
    grid-template-columns: repeat(2, 1fr);
    img { min-height: 400px; max-height: 400px; }
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

    img { min-height: auto; }
  }

  .modal-wrapper :deep(.modal-content) {
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
  }
}
</style>