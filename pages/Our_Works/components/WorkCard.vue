<!-- <template>
  <div class="card__wrapper">
    <img :src="props.src.stringValue" :alt="props.number" loading="lazy" />
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: Object,
    requred: true,
  },
});
</script>

<style lang="scss" scoped>
.card__wrapper {
  position: relative;
  box-shadow: -13px -3px 19px -2px rgba(0, 0, 0, 0.86);
  border-radius: 20px;
}

img {
  width: 100%;
  height: 500px;
  border-radius: 10px;
  object-fit: cover;
}
</style> -->

<template>
  <div class="card__wrapper">
    <img
      :src="props.src.stringValue"
      :alt="props.number"
      loading="lazy"
      class="test2"
    />

    <a :href="props.src.stringValue" target="_blank">
      <img
        :src="props.src.stringValue"
        alt="Фото"
        :class="{ test: props.currentTab[0] === 'double' }"
      />
    </a>
    <!-- <div
      class="test"
      :style="{ 'background-image': 'url(' + props.src.stringValue + ')' }"
    /> -->
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: Object,
    requred: true,
  },

  currentTab: {
    type: Array,
    requred: false,
  },
});
</script>

<style lang="scss" scoped>
.card__wrapper {
  position: relative;
  box-shadow: -13px -3px 19px -2px rgba(0, 0, 0, 0.86);
  border-radius: 20px;
}

img {
  width: 100%;
  height: 500px;
  border-radius: 10px;
  object-fit: cover;
}
a {
  display: none;
}

@media screen and (max-width: 767px) {
  a {
    display: block;
  }
  .test {
    height: 400px;
  }

  .test2 {
    display: none;
  }
}
</style>
