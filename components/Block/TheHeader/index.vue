import type NavbarPhoneVue from './components/NavbarPhone.vue';
<template>
  <div class="container">
    <div class="position">
      <header class="header">
        <icon-logo class="logo" @click="$router.push('/')" />

        <the-navbar class="desktop" />

        <h2>ПАМ'ЯТНИКИ</h2>
        <icon-burger
          class="burger"
          @click="showMobileNavbar = !showMobileNavbar"
          v-if="!showMobileNavbar"
        />

        <icon-close
          class="close"
          @click="showMobileNavbar = !showMobileNavbar"
          v-else
        />
      </header>

      <navbar-mobile
        class="menu"
        :class="{ menu__active: showMobileNavbar }"
        @close-menu="showMobileNavbar = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import IconLogo from "~/assets/icon/IconLogo";
import IconBurger from "~/assets/icon/IconBurger";
import IconClose from "~/assets/icon/IconClose";
import TheNavbar from "./components/TheNavbar.vue";
import NavbarMobile from "./components/NavbarMobile.vue";

const showMobileNavbar = ref(false);
</script>

<style lang="scss" scoped>
.position {
  position: relative;
}
.menu {
  min-width: 100%;
  position: absolute;
  top: -350px;
  &__active {
    top: 122px;
    transition: all 0.6s;
    border-bottom: 2px solid rgba(130, 100, 45, 1);
  }
}
.header {
  padding: 14px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(130, 100, 45, 1);
  background: #000;

  h2 {
    display: none;
    padding-top: 15px;
    font-size: 25px;
    background: linear-gradient(
      to bottom,
      #f2be5c 14%,
      #f2be5c 16%,
      #d99036 10%,
      #cfc09f 32%,
      #ffecb3 40%,
      #3a2c0f 99%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    color: transparent;
  }
}
.logo {
  max-width: 150px;
}

.burger {
  display: none;
}

.close {
  fill: #82642d;
}

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}
@media screen and (max-width: 1199px) {
  .header {
    padding: 14px 20px;
  }

  .logo {
    max-width: 125px;
  }
}

@media screen and (max-width: 1023px) {
  .header {
    padding: 14px 10px;
    h2 {
      display: block;
    }
  }

  .logo {
    max-width: 100px;
  }
  .desktop {
    display: none;
  }
  .burger {
    display: block;
    max-width: 60px;
  }
}

@media screen and (max-width: 767px) {
  .logo {
    max-width: 80px;
  }
  .desktop {
    display: none;
  }
  .burger {
    display: block;
    max-width: 50px;
  }
  .menu__active {
    top: 100px;
  }
}
</style>
