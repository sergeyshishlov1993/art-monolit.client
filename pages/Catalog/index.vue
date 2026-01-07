<template>
  <div class="container">
    <div class="catalog">
      <base-breadcrumbs :items="breadcrumbs" />

      <ui-text-h1 class="center mt-100">КАТАЛОГ</ui-text-h1>

      <div class="wrapper">
        <div class="catalog__wrapper">
          <div class="wrapper__tab mr-100">
            <tabs-page
                :selectedTab="activeTab?.[0]"
                @selecTab="changeSelectTab"
            />
          </div>

          <div class="catalog_card" v-if="!isLoading">
            <catalog-card
                v-for="(card, index) in pagedData"
                :key="card.id || index"
                :src="card.src?.stringValue"
                :alt="card.title?.stringValue"
                :title="card.title?.stringValue"
                :price="card.price?.stringValue"
                :type="card.type?.stringValue"
                class="mr-20 mb-20"
                @click="goToCard(card.id)"
                id="catalog"
            />
          </div>

          <div class="spinner-border" role="status" v-else></div>
        </div>

        <the-pagination idBlock="catalog" />

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
        <div v-if="showModal" class="modal-wrapper">
          <modal-call-back
              currentPath="catalog-cta"
              qwery="custom-calculation"
              @closeModal="showModal = false"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useCatalogData } from "~/stores/catalogData";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import ThePagination from "~/components/Block/ThePagination.vue";
import ModalCallBack from "~/components/Block/Modal/ModalCallBack.vue";
import CatalogCard from "./components/CatalogCard.vue";
import TabsPage from "./components/TabsPage.vue";
import BaseBreadcrumbs from "~/components/UI/BaseBreadcrumbs.vue";

const route = useRoute();
const router = useRouter();
const store = useCatalogData();
const { activeTab, pagedData } = storeToRefs(store);
const { changeTab, getData, getPageItems } = store;

const isLoading = ref(true);
const showModal = ref(false);
const imageUrl = new URL(`/assets/img/catalog/war.webp`, import.meta.url).href;

const breadcrumbs = [
  { label: "головна", to: "/" },
  { label: "каталог" },
];

onMounted(async () => {
  await getData("catalog", "product");
  getPageItems(1);
  isLoading.value = false;
});

async function changeSelectTab(tab: string) {
  isLoading.value = true;
  changeTab(tab);
  await getData("catalog", "product");
  getPageItems(1);
  isLoading.value = false;
}

function goToCard(cardId: string) {
  router.push({
    path: `/catalog/${cardId}`,
    query: {
      activeTab: activeTab.value?.[0],
      pixel: route.query.pixel,
    },
  });
}

const openModal = () => {
  showModal.value = true;
};

watch(showModal, (val) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = val ? "hidden" : "";
  }
});

useHead({
  title: "Памятника Запорожье - Каталог гранитных памятников",
  meta: [
    {
      hid: "main-description",
      name: "description",
      content: "Каталог з одинарними та подвійми пам'ятниками у місті Запоржжя...",
    },
    {
      hid: "og:image-main",
      property: "og:image",
      content: imageUrl,
    },
  ],
});
</script>

<style lang="scss" scoped>
.catalog {
  padding: 75px 50px;
}

.wrapper {
  padding: 100px;
}

.catalog__wrapper {
  padding: 108px 50px 50px 50px;
  display: flex;
  align-items: flex-start;
}

.catalog_card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.spinner-border {
  display: block;
  margin: auto;
}

.center { text-align: center; }
.mr-20 { margin-right: 20px; }
.mb-20 { margin-bottom: 20px; }
.mr-100 { margin-right: 100px; }
.mt-100 { margin-top: 100px; }

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

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media screen and (min-width: 1440px) {
  .container { min-width: 100%; }
}

@media screen and (max-width: 1440px) {
  .catalog_card { grid-template-columns: repeat(2, 1fr); }
}

@media screen and (max-width: 1199px) {
  .catalog__wrapper {
    display: block;
    padding: 80px 20px 20px 20px;
  }
  .mr-20 { margin-right: 10px; }
  .mb-20 { margin-bottom: 10px; }
  .mr-100 { margin-right: 50px; }
}

@media screen and (max-width: 1023px) {
  .wrapper { padding: 0; }
  .catalog { padding: 80px 20px 20px 20px; }
  .mr-100 { margin: 0; }
  .mt-100 { margin-top: 50px; }
}

@media screen and (max-width: 768px) {
  .wrapper { padding: 20px 20px 120px 20px; }
  .catalog { padding: 50px 0 0 0; }
  .catalog__wrapper { padding: 40px 0; }
  .catalog_card { grid-template-columns: 1fr; }

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