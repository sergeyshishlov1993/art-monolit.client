<template>
  <div class="container">
    <div class="our__works">
      <base-breadcrumbs :items="breadcrumbs" />

      <ui-text-h1 class="center mt-100">НАШІ РОБОТИ</ui-text-h1>

      <div class="wrapper">
        <div class="our-work__wrapper">
          <div class="tab mr-100">
            <tabs-page
                :selectedTab="activeTab?.[0]"
                @selecTab="handleTabChange"
            />
          </div>

          <div
              v-if="!isLoading"
              class="our-work__wrapper__card"
              :class="{ double: activeTab?.[0] === 'double' }"
          >
            <work-card
                v-for="(work, index) in pagedData"
                :key="work.id || index"
                :src="work.src"
                :alt="work.alt"
                :current-tab="activeTab"
                id="ourWork"
                @click.stop.prevent="openZoom(work)"
            />
          </div>

          <div v-else class="spinner-border" role="status"></div>
        </div>

        <the-pagination idBlock="ourWork" />

        <div class="cta-section">
          <div class="cta-content">
            <ui-text-h3 class="cta-title">Не знайшли те, що шукали?</ui-text-h3>
            <p class="cta-desc">Ми виготовляємо пам'ятники будь-якої складності за вашим ескізом або фото.</p>
            <button class="cta-btn" type="button" @click.stop.prevent="openModal">
              <ui-text-h3 class="white-text">РОЗРАХУВАТИ ВАРТІСТЬ</ui-text-h3>
            </button>
          </div>
        </div>
      </div>

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
              currentPath="our-works-cta"
              qwery="custom-calculation"
              @closeModal="showModal = false"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCatalogData } from '~/stores/catalogData';

import UiTextH1 from '~/components/UI/UiTextH1.vue';
import UiTextH3 from '~/components/UI/UiTextH3.vue';
import TabsPage from '../Catalog/components/TabsPage.vue';
import WorkCard from './components/WorkCard.vue';
import ZoomImg from '~/components/Block/ZoomImg.vue';
import ThePagination from '~/components/Block/ThePagination.vue';
import ModalCallBack from '~/components/Block/Modal/ModalCallBack.vue';
import BaseBreadcrumbs from '~/components/UI/BaseBreadcrumbs.vue';

const store = useCatalogData();
const { activeTab, pagedData } = storeToRefs(store);
const { changeTab, getData, getPageItems, getPathZoomImg } = store;

const isLoading = ref<boolean>(true);
const showZoomImg = ref<boolean>(false);
const showModal = ref<boolean>(false);
const imageUrl = new URL(`/assets/img/ourWork/1.webp`, import.meta.url).href;

const breadcrumbs = [
  { label: 'головна', to: '/' },
  { label: 'наші роботи' }
];

const handleTabChange = async (tab: string) => {
  isLoading.value = true;
  changeTab(tab);
  await getData('ourWork', 'product');
  getPageItems(1);
  isLoading.value = false;
};

const openZoom = (work: any) => {
  const path = work.src?.stringValue || work.src;
  if (path) {
    showZoomImg.value = true;
    getPathZoomImg(path, 'ourWork');
  }
};

const openModal = () => {
  showZoomImg.value = false;
  showModal.value = true;
};

watch([showModal, showZoomImg], ([isModal, isZoom]) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = (isModal || isZoom) ? 'hidden' : '';
  }
});

onMounted(async () => {
  await getData('ourWork', 'product');
  getPageItems(1);
  isLoading.value = false;
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});

useHead({
  title: 'Памятники Запорожье - Установка гранитных памятников',
  meta: [
    { hid: 'description', name: 'description', content: 'Виготовлення і встановлення пам\'ятників...' },
    { hid: 'og:image', property: 'og:image', content: imageUrl },
  ],
});
</script>

<style lang="scss" scoped>
.container { min-width: 100%; }
.wrapper { padding: 100px; }
.our__works { padding: 75px 50px; }

.our-work__wrapper {
  padding-top: 100px;
  display: flex;
  width: 100%;
  min-height: 400px;

  &__card {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    gap: 30px;
  }
}

.double { grid-template-columns: repeat(2, 1fr); }
.spinner-border { display: block; margin: auto; }
.mr-100 { margin-right: 100px; }
.mt-100 { margin-top: 100px; }
.center { text-align: center; }

.cta-section {
  margin-top: 80px;
  padding: 60px 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-title { margin-bottom: 20px; font-weight: 600; text-transform: uppercase; }
.cta-desc { font-size: 16px; color: #555; margin-bottom: 40px; line-height: 1.5; }

.cta-btn {
  background: #000;
  color: #fff;
  padding: 15px;
  min-width: 250px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    transform: scale(1.02);
    background: #222;
  }
}

.white-text { color: #fff !important; }

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

@media screen and (min-width: 1440px) {
  .our-work__wrapper { justify-content: space-around; }
  .wrapper__card { grid-template-columns: repeat(4, 1fr); }
}

@media screen and (max-width: 1440px) {
  .wrapper { padding: 50px; }
  .our-work__wrapper__card { grid-template-columns: repeat(2, 1fr); }
}

@media screen and (max-width: 1199px) {
  .our-work__wrapper { display: block; }
  .mr-100 { margin-right: 0; margin-bottom: 30px; }
}

@media screen and (max-width: 1023px) {
  .our-work__wrapper { padding-top: 50px; }
  .mt-100 { margin-top: 50px; }
}

@media screen and (max-width: 991px) {
  .our-work__wrapper__card { grid-template-columns: 1fr; }
}

@media screen and (max-width: 767px) {
  .wrapper { padding: 0 0 120px 0; }
  .our__works { padding: 70px 20px; }

  .cta-section {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    border-radius: 0;
    background: #fff;
    box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
    z-index: 90;
    padding: 15px 20px;
    flex-direction: column;
    align-items: center;
  }

  .cta-desc { display: none; }
  .cta-title { margin-bottom: 10px; font-size: 14px; white-space: nowrap; }
  .cta-btn { width: 100%; padding: 10px; }

  .modal-wrapper :deep(.modal-content) {
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
  }
}
</style>
