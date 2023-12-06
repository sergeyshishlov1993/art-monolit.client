<template>
  <div class="modal__done">
    <ui-text-h3 class="fw-500">ОЧІКУЙТЕ СКОРО ВАМ ЗАТЕЛЕФОНУЮТЬ</ui-text-h3>
    <icon-done class="ml-20" />
  </div>
</template>

<script setup>
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import IconDone from "~/assets/icon/iconDone.vue";
</script>

<style lang="scss" scoped>
.modal__done {
  padding: 20px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  width: 500px;
  height: 100px;
  border-radius: 30px;
}
.fw-500 {
  font-weight: 500;
}
</style>
