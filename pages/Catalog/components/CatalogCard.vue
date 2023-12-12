<template>
  <div class="catalog__card">
    <img :src="props.src" :alt="props.title" />
    <div>
      <ui-text-h4 class="mt-25 fw-700">{{ props.title }}</ui-text-h4>
      <ui-text-h4 class="mt-25">
        від <span>{{ props.price }} </span> UAH</ui-text-h4
      >
    </div>
  </div>
</template>

<script setup>
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
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
  padding: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 20px;
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
