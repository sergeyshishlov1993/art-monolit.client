<template>
  <div class="catalog__card">
    <img :src="props.src" :alt="props.title" loading="lazy" />

    <div class="text__wrapper">
      <ui-text-h4 class="mt-25 fw-700">{{ props.title }}</ui-text-h4>
      <hr />
      <ui-text-h4 class="mt-25">
        від <span>{{ props.price }} </span> UAH</ui-text-h4
      >
    </div>
  </div>
</template>

<script setup>
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
  width: 300px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 9px 0px 8px 5px rgba(34, 60, 80, 0.2);
  border-radius: 20px;

  img {
    max-width: 100%;
    max-height: 350px;
    min-height: 250px;
    border-radius: 10px;

    // box-shadow: -5px 16px 19px -5px rgba(34, 60, 80, 1);
    box-shadow: 0px 11px 8px -6px rgba(0, 0, 0, 0.75);
  }
}

.text__wrapper {
  width: 100%;
  h2 {
    text-align: center;
    span {
      color: darkred;
      font-weight: 500;
      font-size: 22px;
    }
  }
  hr {
    color: rgb(130, 100, 45);
    height: 2px;
  }
}

.mt-25 {
  margin-top: 25px;
}
.fw-700 {
  text-align: center;
  font-weight: 700;
}

@media screen and (max-width: 767px) {
  .catalog__card {
    width: 100%;
  }
}
</style>
