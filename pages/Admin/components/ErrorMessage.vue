<template>
  <div>
    <ui-text-h2>Ой схоже якась помилка !!!</ui-text-h2>
    <icon-error />
  </div>
</template>

<script setup>
import UiTextH2 from "~/components/UI/UiTextH2.vue";
import IconError from "~/assets/icon/IconError.vue";
</script>

<style lang="scss" scoped>
div {
  margin-top: 30px;
  padding: 30px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 5px solid darkred;
  border-radius: 30px;
}
.red {
  color: darkred;
}
</style>
