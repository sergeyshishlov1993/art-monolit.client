<template>
  <div class="wrapper-phone">
    <div class="mr-10">
      <icon-phone />
    </div>

    <div>
      <a href="+380508520594">
        <ui-text-h3 class="white">+380-50-852-05-94</ui-text-h3>
      </a>

      <a href="+380508520590">
        <ui-text-h3 class="white">+380-50-852-05-90</ui-text-h3>
      </a>
    </div>
  </div>
</template>

<script setup>
import UiTextH3 from "~/components/ui/UiTextH3";
import IconPhone from "~/assets/icon/IconPhone.vue";
</script>

<style lang="scss" scoped>
.wrapper-phone {
  display: flex;
  align-items: flex-start;
  margin-left: 60px;
}
a {
  color: inherit;
}
.mr-10 {
  margin-right: 10px;
}
.white {
  color: #ffffff;
}
</style>
