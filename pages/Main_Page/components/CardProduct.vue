<template>
  <div class="card__product">
    <img :src="imageUrl" :alt="props.alt" />

    <ui-text-h2 class="fw-500">{{ props.title }}</ui-text-h2>
  </div>
</template>

<script setup>
import UiTextH2 from "~/components/UI/UiTextH2.vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const imageUrl = `/catalog/${props.src}`;
</script>

<style lang="scss" scoped>
.card__product {
  margin-top: 70px;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;

  &:hover {
    color: #82642d;
  }
}
img {
  max-width: 350px;
  min-height: 300px;
  height: auto;
  margin-bottom: 20px;
}
.fw-500 {
  font-weight: 500;
  cursor: pointer;
}
@media screen and (max-width: 1500px) {
  .card__product {
    margin-right: 45px;
  }
}

@media screen and (max-width: 991px) {
  .card__product {
    margin-right: 0;
  }
}

@media screen and (max-width: 767px) {
  img {
    max-width: 250px;
  }
}
</style>
