<template>
  <div class="work-item">
    <img src="~assets/img/OurWork.png" alt="" />

    <div class="number">
      <ui-text-h1 class="white">{{ props.number }}</ui-text-h1>
    </div>
  </div>
</template>

<script setup>
import UiTextH1 from "~/components/UI/UiTextH1";

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.work-item {
  position: relative;
}

.number {
  position: absolute;
  bottom: 10px;
  left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(1, 0, 2, 1);
  min-width: 50px;
  min-height: 50px;
  border-radius: 30px;
}

.white {
  color: white;
}

img {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
</style>
