<template>
  <div class="pagination">
    <ui-btn class="mr-20 button" @click="getPrevData">ПОВЕРНУТИСЯ</ui-btn>

    <div class="page">
      <ui-btn
        @click="getPageItems(1)"
        class="button page"
        :class="{ active: currentPage[0] === 1 }"
        >1</ui-btn
      >

      <div v-if="currentPage[0] > 4">...</div>

      <ui-btn
        v-for="page in test"
        :key="page"
        @click="getPageItems(page)"
        class="button page"
        :class="{ active: currentPage[0] === page }"
        >{{ page }}</ui-btn
      >

      <div v-if="totalPage[0] > 4">...</div>

      <ui-btn
        v-if="totalPage[0] > 4"
        @click="getPageItems(totalPage[0])"
        class="button page"
        :class="{ active: currentPage[0] === totalPage[0] }"
      >
        {{ totalPage[0] }}
      </ui-btn>
    </div>

    <ui-btn class="button" @click="getNextData">ПОКАЗАТИ ЩЕ</ui-btn>
  </div>
</template>

<script setup>
import UiBtn from "~/components/UI/UiBtn.vue";
import { useCatalogData } from "~/stores/catalogData";
const {
  activeTab,
  changeTab,
  getData,
  getNextData,
  getPrevData,
  totalPage,
  getPageItems,
  pagedData,
  currentPage,
  test,
} = useCatalogData();
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 150px !important;
}
.active {
  background: #000;
  color: white;
}
.button {
  &:hover {
    background: #000;
    color: white;
  }
}
.page {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

@media screen and (max-width: 991px) {
  .pagination {
    gap: 50px !important;
    flex-direction: column;
  }
}
</style>
