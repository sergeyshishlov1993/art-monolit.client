<template>
  <div>
    <ui-text-h1 class="mr-10">Успішно завантаженно</ui-text-h1>
    <icon-done />
  </div>
</template>

<script setup>
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import IconDone from "~/assets/icon/iconDone.vue";
</script>

<style lang="scss" scoped>
div {
  padding: 30px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mr-10 {
  margin-right: 10px;
}
</style>
