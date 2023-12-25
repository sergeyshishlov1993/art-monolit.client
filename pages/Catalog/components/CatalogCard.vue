<template>
  <div class="catalog__card">
    <div class="sceletor" v-if="isLoadingImg"></div>
    <img
      :src="props.src"
      :alt="props.title"
      loading="lazy"
      @load="isLoadingImg = false"
    />

    <div>
      <ui-text-h4 class="mt-25 fw-700">{{ props.title }}</ui-text-h4>
      <ui-text-h4 class="mt-25">
        від <span>{{ props.price }} </span> UAH</ui-text-h4
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
const isLoadingImg = ref(true);

const props = defineProps({
  src: {
    type: String,
    requred: true,
  },
  alt: {
    type: String,
    requred: true,
  },
  title: {
    type: String,
    requred: true,
  },
  price: {
    type: String,
    requred: true,
  },
});
</script>

<style lang="scss" scoped>
.catalog__card {
  position: relative;
  padding: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 20px;
  img {
    width: 100%;
    height: 300px;
    border-radius: 10px;
  }
}

.sceletor {
  position: absolute;

  width: 80%;
  height: 200px;
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

.mt-25 {
  margin-top: 25px;
  span {
    color: darkred;
    font-weight: 700;
  }
}
.fw-700 {
  text-align: center;
  font-weight: 700;
}

@media screen and (max-width: 1199px) {
  .catalog__card {
    width: 200px;
  }
}
@media screen and (max-width: 767px) {
  .catalog__card {
    width: 150px;
  }
  .mt-25 {
    margin-top: 15px;
  }
}
</style>
