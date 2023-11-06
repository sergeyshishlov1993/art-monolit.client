import type NavbarPhoneVue from './components/NavbarPhone.vue';
<template>
  <div class="container">
    <header class="header">
      <div class="logo">
        <icon-logo />
      </div>

      <the-navbar />
    </header>
  </div>
</template>

<script setup>
import IconLogo from "~/assets/icon/IconLogo";
import TheNavbar from "./components/TheNavbar.vue";
</script>

<style lang="scss" scoped>
.header {
  padding: 14px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000;
}
.logo {
  max-width: 150px;
}

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}
@media screen and (min-width: 1023px) {
  .header {
    padding: 14px 20px;
  }

  .logo {
    max-width: 125px;
  }
}
</style>
