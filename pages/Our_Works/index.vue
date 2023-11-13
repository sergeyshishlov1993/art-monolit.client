<template>
  <div class="container">
    <div class="our__works">
      <div class="navigation">
        <nuxt-link to="/">
          <ui-text-h4 class="fw-500">головна</ui-text-h4>
        </nuxt-link>

        <ui-text-h4 class="fw-500">/наші роботи</ui-text-h4>
      </div>

      <ui-text-h1 class="center mt-100">НАШІ РОБОТИ</ui-text-h1>

      <div class="wrapper">
        <div class="tab mr-100">
          <tabs-page :selectedTab="activeTab[0]" @selecTab="selecChangeTab" />
        </div>

        <div class="wrapper__card">
          <work-card
            v-for="(work, index) in filterData"
            :key="work"
            :src="work.src"
            :alt="work.alt"
            :number="index + 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import TabsPage from "../Catalog/components/TabsPage.vue";
import WorkCard from "./components/WorkCard.vue";
import { useOurWorkData } from "~/stores/ourWorkData";

const { activeTab, changeTab, ourWorkData } = useOurWorkData();

onMounted(() => {
  return changeTab("single");
});

function selecChangeTab(tab) {
  return changeTab(tab);
}

const filterData = computed(() => {
  return ourWorkData[activeTab[0]];
});
</script>

<style lang="scss" scoped>
.our__works {
  padding: 75px 50px;
}
.wrapper {
  padding-top: 100px;
  display: flex;
  &__card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-auto-columns: auto;
    gap: 10px;
  }
}
.navigation {
  display: flex;
  a {
    color: inherit;
  }
}

.center {
  text-align: center;
}
.mr-100 {
  margin-right: 100px;
}
.mt-100 {
  margin-top: 100px;
}

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
  .wrapper {
    justify-content: space-around;
  }
  .wrapper__card {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1199px) {
  .wrapper__card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1023px) {
  .wrapper {
    padding-top: 50px;
    display: block;
  }
  .mr-100 {
    margin-right: 0;
  }

  .mt-100 {
    margin-top: 50px;
  }
}

@media screen and (max-width: 767px) {
  .our__works {
    padding: 70px 0;
  }
}
</style>
