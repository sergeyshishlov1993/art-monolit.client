<template>
  <div class="modal__error">
    <ui-text-h2 class="fw-500 red">ЩОСЬ ПІШЛО НЕ ТАК !</ui-text-h2>
    <ui-text-h2 class="fw-500 red mt-20">СПРОБУЙТЕ ПІЗНІШЕ !</ui-text-h2>
    <icon-error class="mt-20" />
  </div>
</template>

<script setup>
import IconError from "~/assets/icon/IconError.vue";
import UiTextH2 from "~/components/UI/UiTextH2.vue";
</script>

<style lang="scss" scoped>
.modal__error {
  padding: 30px;
  margin: 0 auto;
  margin-top: 50px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  border: 10px solid darkred;
  background: white;
}
.fw-500 {
  font-weight: 500;
}

.red {
  color: darkred;
}
.mt-20 {
  margin-top: 20px;
}

@media screen and (max-width: 766px) {
  .modal__error {
    width: 100%;
  }
}
</style>
