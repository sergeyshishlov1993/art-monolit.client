<template>
  <div class="wrapper">
    <div class="nav-links">
      <nuxt-link @click="goToCatalog" class="nav-item">
        <ui-text-h3 class="white">каталог</ui-text-h3>
      </nuxt-link>

      <nuxt-link :to="linkToSection('about')" class="nav-item">
        <ui-text-h3 class="white">про нас</ui-text-h3>
      </nuxt-link>

      <nuxt-link to="/our_works" class="nav-item">
        <ui-text-h3 class="white">наші работи</ui-text-h3>
      </nuxt-link>

      <nuxt-link :to="linkToSection('map')" class="nav-item">
        <ui-text-h3 class="white">як нас знайти</ui-text-h3>
      </nuxt-link>
    </div>

    <div class="wrapper-phone" @click="toggleDropdown" v-click-outside="closeDropdown">
      <div class="phone-trigger">
        <ui-text-h3 class="white main-number">+380 (50) 852-05-94</ui-text-h3>
        <svg
            class="chevron"
            :class="{ rotated: isOpen }"
            width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <transition name="fade">
        <div class="dropdown-menu" v-if="isOpen">
          <a href="tel:380508520590" class="dropdown-item">
            <ui-text-h3 class="white small">+380 (50) 852-05-90</ui-text-h3>
          </a>

        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCatalogData } from "~/stores/catalogData";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import IconPhone from "~/assets/icon/IconPhone.vue";

const route = useRoute();
const router = useRouter();
const { changeTab } = useCatalogData();

// Логика dropdown
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

// Простая директива для клика вне элемента (можно вынести в отдельный файл)
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};

function linkToSection(section) {
  const currentPath = route.path;
  return currentPath === "/"
      ? { path: "/", hash: `#${section}` }
      : { path: "/", hash: `#${section}` };
}

function goToCatalog() {
  changeTab("single");
  return router.push(`/catalog?pixel=${route.query.pixel}`);
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-item {
  cursor: pointer;
}

/* Стили блока телефона */
.wrapper-phone {
  position: relative; /* Для позиционирования dropdown */
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 40px;
  cursor: pointer;
  padding: 5px 0;
  user-select: none;
}

.phone-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-number {
  white-space: nowrap;
}

.chevron {
  transition: transform 0.3s ease;
  &.rotated {
    transform: rotate(180deg);
  }
}

/* Выпадающий список */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0; /* Или left: 0, в зависимости от выравнивания */
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.9); /* Темный фон */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 15px;
  min-width: 200px;
  z-index: 50;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dropdown-item {
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
}

.small {
  font-size: 14px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

a {
  color: inherit;
  display: block;
}

.white {
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
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

@media screen and (max-width: 1200px) {
  .nav-links {
    gap: 15px;
  }
  .wrapper-phone {
    margin-left: 20px;
  }
}
</style>