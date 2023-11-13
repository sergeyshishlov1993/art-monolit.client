<template>
  <div class="catalog__card">
    <img :src="path" :alt="props.alt" />
    <div>
      <ui-text-h4 class="mt-25">{{ props.title }}</ui-text-h4>
      <ui-text-h3 class="mt-25">{{ props.description }}</ui-text-h3>
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
  description: {
    type: String,
    requred: true,
  },
});

const path = `/_nuxt/assets/img/catalog/${props.src}`;
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
