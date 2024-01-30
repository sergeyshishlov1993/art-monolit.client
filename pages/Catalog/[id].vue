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
          >/{{ product[0].title.stringValue }}</ui-text-h4
        >
      </div>

      <div class="product">
        <div class="mr-40">
          <div class="sceletor" v-if="isLoadingImg"></div>
          <img
            :src="product[0].src.stringValue"
            alt="catalog__item"
            loading="lazy"
            @load="isLoadingImg = false"
          />
        </div>

        <div class="description">
          <ui-text-h1>{{ product[0].title.stringValue }}</ui-text-h1>
          <ui-text-h3 class="fw-500 mt-40"
            >РОЗМІР : {{ product[0].size.stringValue }} ММ</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >МАТЕРІАЛ : {{ product[0].material.stringValue }}</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >ТЕРМІН ВИГОТОВЛЕННЯ :
            {{ product[0].term.stringValue }} ДНІВ</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >ДОСТАВКА : {{ product[0].delivery.stringValue }}</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >КОМПЛЕКТАЦІЯ : {{ product[0].equipment.stringValue }}</ui-text-h3
          >

          <ui-btn class="button" @click="getPrice" :disabled="showModal">
            <ui-text-h3>ДІЗНАТИСЯ ВАРТІСТЬ</ui-text-h3>
          </ui-btn>
        </div>
      </div>
      <modal-call-back v-if="showModal" @closeModal="showModal = false" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCatalogData } from "~/stores/catalogData";
import { useRoute } from "vue-router";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import UiBtn from "~/components/UI/UiBtn";
import ModalCallBack from "~/components/Block/Modal/ModalCallBack.vue";

const { getItemProduct } = useCatalogData();
const product = ref();
const route = useRoute();
const isLoading = ref(true);
const isLoadingImg = ref(true);

onMounted(async () => {
  try {
    product.value = await getItemProduct(route.params.id);

    isLoading.value = false;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
});

const showModal = ref(false);
function getPrice() {
  showModal.value = true;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
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
  img {
    max-width: 100%;
    height: 600px;
    width: auto;
    border-radius: 20px;
    z-index: 2;
  }
}

.description {
  display: flex;
  flex-direction: column;
}

.button {
  margin-top: 265px;
  &:hover {
    background: #000;
    color: white;
  }
}

.sceletor {
  position: absolute;
  top: 0;
  max-width: 100%;
  height: 600px;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  animation: loading 1.5s infinite;
  z-index: 1;
}

@keyframes loading {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
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
  position: relative;
  max-width: 100%;
  margin-right: 40px;
}
.mt-40 {
  margin-top: 40px;
}

.spinner-border {
  display: block;
  margin: 0 auto;
  margin-top: 200px;
  margin-bottom: 200px;
}

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}

@media screen and (max-width: 1440px) {
  .product {
    padding: 100px 0;
  }
}

@media screen and (max-width: 1199px) {
  .product {
    padding: 50px 20px;
    flex-direction: column;
    align-items: center;
  }

  .description {
    margin-top: 50px;
    width: 100%;
  }
  .mr-40 {
    margin-right: 0;
  }
}

@media screen and (max-width: 1023px) {
  .product {
    padding: 50px 0;
    img {
      height: auto;
    }
  }
}
</style>
