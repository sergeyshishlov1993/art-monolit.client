<template>
  <div class="wrapper">
    <nuxt-link to="#">
      <ui-text-h3 class="white mr-50">каталог</ui-text-h3>
    </nuxt-link>

    <nuxt-link to="#">
      <ui-text-h3 class="white mr-50">про нас</ui-text-h3>
    </nuxt-link>

    <nuxt-link to="#">
      <ui-text-h3 class="white mr-50">наші работи</ui-text-h3>
    </nuxt-link>

    <nuxt-link to="#">
      <ui-text-h3 class="white mr-50">як нас знайти</ui-text-h3>
    </nuxt-link>

    <navbar-phone />
  </div>
</template>

<script setup>
import UiTextH3 from "~/components/ui/UiTextH3";
import IconPhone from "~/assets/icon/IconPhone.vue";
import NavbarPhone from "./NavbarPhone.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
}

a {
  color: inherit;
}
.white {
  color: #ffffff;
}

.mr-50 {
  margin-right: 50px;
}

@media screen and (min-width: 1023px) {
  .mr-50 {
    margin-right: 20px;
  }
}
</style>
