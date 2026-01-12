<template>
  <div class="wrapper">
    <ui-text-h1 class="white">НАШІ РОБОТИ</ui-text-h1>

    <div class="work-card" id="mainOurWork">
      <div
          v-for="img in ourWorkStatic"
          :key="img"
          class="work-card__item"
          @click.stop.prevent="openZoom(img)"
          role="button"
          tabindex="0"
          @keydown.enter.stop.prevent="openZoom(img)"
      >
        <img
            :src="getImageUrl(img)"
            alt="our works img"
            loading="lazy"
            class="work-card__image"
        />
      </div>
    </div>

    <ui-btn class="button">
      <ui-text-h3 class="white" @click="$router.push('/our_works')">
        ПЕРЕГЛЯНУТИ ГАЛЕРЕЮ
      </ui-text-h3>
    </ui-btn>

    <transition name="fade">
      <zoom-img v-if="showZoomImg" @close="showZoomImg = false" @openModal="openModal" />
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

const ourWorkStatic = ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"];

const getImageUrl = (img: string): string => `/ourWork/${img}`;

const openZoom = (img: string): void => {
  const path = getImageUrl(img);
  showZoomImg.value = true;
  getPathZoomImg(path, "mainOurWork");
};

const openModal = (): void => {
  showZoomImg.value = false;
  showModal.value = true;
};

watch([showZoomImg, showModal], ([zoom, modal]) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = zoom || modal ? "hidden" : "";
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
}

.work-card__item {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.06);
  transition: transform 0.3s ease;
}

.work-card__item:hover {
  transform: scale(1.02);
}

.work-card__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
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

:deep(.zoom-img-wrapper),
:deep(.zoom) {
  z-index: 10000 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 1199px) {
  .work-card {
    grid-template-columns: repeat(2, 1fr);
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

  .modal-wrapper :deep(.modal-content) {
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
  }
}
</style>
