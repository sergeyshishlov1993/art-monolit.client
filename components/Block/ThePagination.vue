<template>
  <div class="pagination">
    <ui-btn
      class="mr-20 button"
      @click="getPrevData"
      :disabled="currentPage[0] === 1"
      >ПОВЕРНУТИСЯ</ui-btn
    >

    <div class="page">
      <ui-btn
        v-for="page in visiblePages"
        :key="page"
        @click="page !== '...' ? getPageItems(page) : null"
        class="button page"
        :class="{ active: currentPage[0] === page }"
        >{{ page }}</ui-btn
      >
    </div>

    <ui-btn
      class="button"
      @click="getNextData"
      :disabled="currentPage === totalPage[0]"
      >ПОКАЗАТИ ЩЕ</ui-btn
    >
  </div>
</template>

<script setup>
import { computed } from "vue";
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
} = useCatalogData();
const pagesToShow = 3;

const visiblePages = computed(() => {
  const startPage = Math.max(1, currentPage[0] - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPage[0], startPage + pagesToShow - 1);

  let pages = [];
  if (startPage > 1) {
    pages.push(1, "..."); // Добавляем первую страницу и многоточие, если есть страницы слева
  }
  for (let page = startPage; page <= endPage; page++) {
    pages.push(page); // Добавляем видимые страницы
  }
  if (endPage < totalPage[0]) {
    pages.push("...", totalPage[0]); // Добавляем многоточие и последнюю страницу, если есть страницы справа
  }

  return pages;
});
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 200px !important;
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
  gap: 25px;
}

@media screen and (max-width: 991px) {
  .pagination {
    gap: 50px !important;
    flex-direction: column;
  }
}
</style>
