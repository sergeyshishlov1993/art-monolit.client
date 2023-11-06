<template>
  <div class="wrapper">
    <ui-text-h1>TEST</ui-text-h1>
    <ui-text-h2>TEST</ui-text-h2>
    <ui-text-h3>TEST</ui-text-h3>
    <ui-text-h4>TEST</ui-text-h4>

    <ui-text-h2>icon</ui-text-h2>
    <div class="wrapper__icon_white">
      <icon-phone />
      <icon-logo />
    </div>
  </div>
</template>

<script setup>
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH2 from "~/components/UI/UiTextH2.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import IconLogo from "~/assets/icon/IconLogo";
import IconPhone from "~/assets/icon/IconPhone.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 40px;
  &__icon_white {
    background: #000;
  }
}
</style>
