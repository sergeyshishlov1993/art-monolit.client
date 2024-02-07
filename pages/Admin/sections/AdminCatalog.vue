<template>
  <div class="wrapper">
    <component :is="choiceSucsesMessage" />
    <div class="admin__catalog">
      <tabs-page
        :selectedTab="activeTab"
        @selec-tab="changeSelectTab"
        class="mr-80"
      />

      <div class="card__wrapper" v-if="isLoading">
        <admin-card-catalog
          v-for="card in pagedData"
          :key="card.id"
          :src="card.src"
          :title="card.title"
          :price="card.price"
          :id="card.id"
          :type="card.type"
          :term="card.term"
          :size="card.size"
          :material="card.material"
          :delivery="card.delivery"
          :equipment="card.equipment"
          @updateFormData="updatedDoc"
          @remove="removeDoc"
        />
      </div>
      <div class="spinner-border" role="status" v-else></div>
    </div>

    <the-pagination />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import TabsPage from "../../Catalog/components/TabsPage.vue";
import AdminCardCatalog from "../components/AdminCardCatalog.vue";
import ThePagination from "~/components/Block/ThePagination.vue";
import { useCatalogData } from "~/stores/catalogData";
import SucsesMessageRemove from "../components/SucsesMessageRemove.vue";
import SucsesMessageChange from "../components/SucsesMessageChange.vue";

const {
  changeTab,
  getData,
  getPageItems,
  pagedData,
  updateDocumentById,
  removeCard,
  showSucsesMesage,
} = useCatalogData();

const activeTab = ref("single");
const isLoading = ref(false);

const props = defineProps({
  adminTab: {
    type: String,
    requred: true,
  },
});

onMounted(async () => {
  await getData(props.adminTab, "product");
  getPageItems(1);
  isLoading.value = true;
});

const choiceSucsesMessage = computed(() => {
  if (showSucsesMesage[0] == "remove") {
    return SucsesMessageRemove;
  } else if (showSucsesMesage[0] == "change") {
    return SucsesMessageChange;
  }
});

async function changeSelectTab(tab) {
  changeTab(tab);
  activeTab.value = tab;
  await getData(props.adminTab, "product");
  getPageItems(1);
}
function updatedDoc(date, documentId, url, newImg) {
  updateDocumentById(date, documentId, url, newImg, props.adminTab);
}

function removeDoc(id, path) {
  removeCard(id, path, props.adminTab);
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  padding: 100px;
}

.admin__catalog {
  padding: 50px;
  display: flex;
}
.card__wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 40px;
}

.spinner-border {
  display: block;
  margin: auto;
}

.mr-80 {
  margin-right: 80px;
}

@media screen and (max-width: 1440px) {
  .card__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1199px) {
  .wrapper {
    padding: 30px;
  }

  .card__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .admin__catalog {
    flex-direction: column;
  }

  .mr-80 {
    margin: 0;
  }
}

@media screen and (max-width: 991px) {
  .admin__catalog {
    padding: 0;
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 25px;
  }
  .card__wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
