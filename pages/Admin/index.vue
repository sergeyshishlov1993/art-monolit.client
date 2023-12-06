<template>
  <div class="container">
    <div class="admin">
      <div class="admin__wrapper">
        <div class="admin-wrapper__navbar">
          <ui-text-h3
            @click="changeTab('call')"
            :class="{ active: activeTab == 'call' }"
            >ПЕРЕДЗВОНИТИ</ui-text-h3
          >
          <ui-text-h3
            @click="changeTab('add')"
            :class="{ active: activeTab == 'add' }"
            >ДОДАТИ ТОВАР</ui-text-h3
          >
          <ui-text-h3
            @click="changeTab('catalog')"
            :class="{ active: activeTab == 'catalog' }"
            >КАТАЛОГ</ui-text-h3
          >
          <ui-text-h3
            @click="changeTab('ourWork')"
            :class="{ active: activeTab == 'ourWork' }"
            >НАШІ РОБОТИ</ui-text-h3
          >
        </div>
        <!-- ------------------- -->
        <component :is="tabContent"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import CallBackTable from "./sections/CallBackTable.vue";
import AddProduct from "./sections/AddProduct.vue";
import AdminCategory from "./sections/AdminCategory.vue";
import AdminOurWork from "./sections/AdminOurWork.vue";

const activeTab = ref("call");

function changeTab(name) {
  return (activeTab.value = name);
}

const tabContent = computed(() => {
  switch (activeTab.value) {
    case "call":
      return CallBackTable;

    case "add":
      return AddProduct;

    case "catalog":
      return AdminCategory;

    case "ourWork":
      return AdminOurWork;
  }
});
</script>

<style lang="scss" scoped>
.admin {
  &-wrapper {
    &__navbar {
      padding: 30px 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #000;
      h2 {
        color: white;
        cursor: pointer;
        &:hover {
          color: rgba(130, 100, 45, 1);
          font-weight: 500;
        }
      }
    }
  }
}
.center {
  text-align: center;
}

.active {
  font-weight: 500;
  color: rgba(130, 100, 45, 1) !important;
}
@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
    padding: 0;
  }
}
</style>
