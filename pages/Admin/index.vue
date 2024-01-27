<template>
  <div class="container">
    <div class="admin" v-if="isAuth[0]">
      <div class="admin__wrapper">
        <div class="admin-wrapper__navbar">
          <ui-text-h3
            @click="changeTab('feedback')"
            :class="{ active: activeTab == 'feedback' }"
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

        <component :is="tabContent" :adminTab="activeTab"></component>
      </div>
    </div>

    <modal-sing-in v-else />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import CallBackTable from "./sections/CallBackTable.vue";
import AddProduct from "./sections/AddProduct.vue";
import AdminCatalog from "./sections/AdminCatalog.vue";
import AdminOurWork from "./sections/AdminOurWork.vue";
import ModalSingIn from "./components/ModalSingIn.vue";

onMounted(async () => {
  await refreshTokenIfExpired();
});

import { useFirebaseAuth } from "~/stores/firebaseAuth";

const { isAuth, refreshTokenIfExpired } = useFirebaseAuth();

const activeTab = ref("feedback");

function changeTab(name) {
  return (activeTab.value = name);
}

const tabContent = computed(() => {
  switch (activeTab.value) {
    case "feedback":
      return CallBackTable;

    case "add":
      return AddProduct;

    case "catalog":
      return AdminCatalog;

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
          background: linear-gradient(
            to bottom,
            #f2be5c 14%,
            #f2be5c 16%,
            #d99036 10%,
            #cfc09f 32%,
            #ffecb3 40%,
            #3a2c0f 99%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          color: transparent;
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
  background: linear-gradient(
    to bottom,
    #f2be5c 14%,
    #f2be5c 16%,
    #d99036 10%,
    #cfc09f 32%,
    #ffecb3 40%,
    #3a2c0f 99%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  color: transparent;
}
@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
    padding: 0;
  }
}
@media screen and (max-width: 1399px) {
  .container {
    min-width: 100%;
    padding: 0;
  }
}

@media screen and (max-width: 1023px) {
  .admin-wrapper__navbar {
    padding: 20px;
  }
}

@media screen and (max-width: 767px) {
  .admin-wrapper__navbar {
    flex-direction: column;
    h2 {
      margin-bottom: 10px;
    }
  }
}
</style>
