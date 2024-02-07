<template>
  <div class="wrapper">
    <div class="admin__catalog">
      <tabs-page
        :selectedTab="activeTab"
        @selecTab="changeSelectTab"
        class="mr-80"
      />

      <div class="card__wrapper" v-if="isLoading">
        <admin-card-our-work
          v-for="(card, index) in pagedData"
          :key="card.id"
          :src="card.src"
          :id="card.id"
          :index="index"
          :type="card.type"
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
import { ref, onMounted } from "vue";
import TabsPage from "../../Catalog/components/TabsPage.vue";
import AdminCardOurWork from "../components/AdminCardOurWork.vue";
import ThePagination from "~/components/Block/ThePagination.vue";

import { useCatalogData } from "~/stores/catalogData";

const {
  changeTab,
  getData,
  getPageItems,
  pagedData,
  updateDocumentById,
  removeCard,
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
  padding: 100px;
}

.spinner-border {
  display: block;
  margin: auto;
}
.button {
  &:hover {
    background: #000;
    color: white;
  }
}
.mr-20 {
  margin-right: 20px;
}
.admin__catalog {
  padding: 50px;
  display: flex;
}
.card__wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3 1fr);
  gap: 30px;
}

.active {
  background: #000;
  color: white;
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
    padding: 50px;
  }

  .admin__catalog {
    flex-direction: column;
  }

  .mr-80 {
    margin: 0;
  }
}

@media screen and (max-width: 991px) {
  .card__wrapper {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 25px;
  }
  .admin__catalog {
    padding: 0;
  }
}
</style>
