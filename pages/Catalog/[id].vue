<template>
  <div class="container">
    <div class="spinner-border" role="status" v-if="isLoading"></div>

    <div class="about__product" :class="{ substrate: showModal }" v-else>
      <div class="navigation">
        <nuxt-link to="/">
          <ui-text-h4 class="fw-500">головна</ui-text-h4>
        </nuxt-link>

        <nuxt-link to="/catalog">
          <ui-text-h4 class="fw-500">/каталог</ui-text-h4>
        </nuxt-link>

        <ui-text-h4 class="fw-500"
          >/{{ product[route.params.id].title }}</ui-text-h4
        >
      </div>

      <div class="product">
        <img
          :src="product[route.params.id].src"
          alt="catalog__item"
          class="mr-40"
        />

        <div class="description">
          <ui-text-h1>{{ product[route.params.id].title }}</ui-text-h1>
          <ui-text-h3 class="fw-500 mt-40"
            >РОЗМІР : {{ product[route.params.id].size }}</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >МАТЕРИАЛ : {{ product[route.params.id].material }}</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >ТЕРМІН ВИГОТОВЛЕННЯ :
            {{ product[route.params.id].term }} ДНІВ</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >ДОСТАВКА : {{ product[route.params.id].delivery }}</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >КОМПЛЕКТАЦІЯ : {{ product[route.params.id].equipment }}</ui-text-h3
          >

          <ui-btn
            class="button"
            @click="showModal = !showModal"
            :disabled="showModal"
          >
            <ui-text-h3>ДІЗНАТИСЯ ВАРТІСТЬ</ui-text-h3>
          </ui-btn>
        </div>
      </div>
      <modal-call-back v-if="showModal" @closeModal="showModal = false" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useCatalogData } from "~/stores/catalogData";
import { useRoute } from "vue-router";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import UiBtn from "~/components/UI/UiBtn";
import ModalCallBack from "~/components/Block/Modal/ModalCallBack.vue";

const { getData } = useCatalogData();
let product = ref([]);
let isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await getData();
    product.value = [...res];
    console.log(product.value);
    isLoading.value = false;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
});

const route = useRoute();

const showModal = ref(false);
</script>

<style lang="scss" scoped>
.about__product {
  padding: 75px 20px 20px 20px;
}

.navigation {
  display: flex;
  a {
    color: inherit;
  }
}

.product {
  padding: 100px 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.description {
  display: flex;
  flex-direction: column;
}

.button {
  margin-top: 100px;
  &:hover {
    background: #000;
    color: white;
  }
}

.substrate {
  background: rgba(0, 0, 0, 0.25);
}
.fw-500 {
  font-weight: 500;
}

.mt-20 {
  margin-top: 20px;
}
.mr-40 {
  margin-right: 40px;
}
.mt-40 {
  margin-top: 40px;
}

.spinner-border {
  display: block;
  margin: 0 auto;
}

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}

@media screen and (max-width: 1199px) {
  .mr-40 {
    margin-right: 0;
  }
}

@media screen and (max-width: 1023px) {
  .product {
    padding: 50px 20px;
    flex-direction: column;
    align-items: center;
  }

  .description {
    margin-top: 50px;
  }
}

@media screen and (max-width: 1023px) {
  .product {
    padding: 50px 0;
  }
}
</style>
