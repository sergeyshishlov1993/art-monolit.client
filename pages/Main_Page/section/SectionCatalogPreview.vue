<template>
  <div class="wrapper">
    <ui-text-h1 class="center">КАТАЛОГ</ui-text-h1>

    <div class="wrapper__product">
      <card-product
        v-for="prod in card"
        :key="prod.title"
        :src="prod.src"
        :alt="prod.alt"
        :title="prod.title"
        @click="goToCatalog(prod.name)"
      />
    </div>

    <ui-btn class="button" @click="goToCatalog('single')">
      <ui-text-h3 class="fw-500">ПЕРЕЙТИ В КАТАЛОГ</ui-text-h3>
    </ui-btn>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useCatalogData } from "~/stores/catalogData";
import { useRouter } from "vue-router";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import CardProduct from "../components/CardProduct.vue";
import UiBtn from "~/components/UI/UiBtn.vue";

const router = useRouter();
const { changeTab } = useCatalogData();

function goToCatalog(id) {
  changeTab(id);
  router.push(`/catalog`);
}

const card = reactive({
  single: {
    src: "1.png",
    alt: "Одиночні",
    title: "Одинарні",
    name: "single",
  },
  double: {
    src: "2.png",
    alt: "Двійні",
    title: "Двійні",
    name: "double",
  },
  marble: {
    src: "mram.png",
    alt: "Меморіальні Комплекси",
    title: "Меморіальні Комплекси",
    name: "marble",
  },
  kids: {
    src: "kids.png",
    alt: "Дитячі",
    title: "Дитячі",
    name: "kids",
  },
  accessories: {
    src: "acs.png",
    alt: "Аксесуари",
    title: "Аксесуари",
    name: "accessories",
  },
  cross: {
    src: "cross.png",
    alt: "Хрести",
    title: "Хрести",
    name: "cross",
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  &__product {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
  }
}
.button {
  margin-top: 150px;
  min-width: 300px;
  align-self: center;
  &:hover {
    background: #000;
    color: white;
  }
}
.fw-500 {
  font-weight: 500;
}
.center {
  text-align: center;
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 100px 50px 50px 50px;
  }
  .button {
    margin-top: 100px;
    min-width: 250px;
  }
}
</style>
