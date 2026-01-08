<template>
  <div class="wrapper">
    <TheHeader />

    <div class="container">
      <NuxtPage />

      <a
          class="viber-widget"
          :href="viberChatLink"
          aria-label="Написати менеджеру у Viber"
      >
        <IconViber class="viber-widget__icon" />
        <span class="viber-widget__label">Написати менеджеру</span>
      </a>

      <icon-shevron
          class="shevron"
          v-if="showScrollToTop"
          @click="scrollToTop"
      />
    </div>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from "~/components/Block/TheHeader";
import TheFooter from "~/components/Block/TheFooter";
import IconShevron from "~/assets/icon/IconShevron.vue";
import IconViber from "~/assets/icon/IconViber.vue";
import useScrollToTop from "~/utils/useScrollToTop";

const { showScrollToTop, scrollToTop } = useScrollToTop();

// const viberChatLink: string = "viber://chat?number=%2B380951121777";
const viberChatLink: string = "viber://chat?number=%2B380985024333";

</script>

<style lang="scss">
.container {
  min-width: 100%;
  padding: 0;
}
</style>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  position: relative;
}

.viber-widget {
  position: fixed;
  right: 5px;
  bottom: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.viber-widget__icon {
  width: 100px;
  height: 100px;
  background: #7360f2;
  border-radius: 50%;
  padding: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  animation: viberPulse 2s infinite;
}

.viber-widget__label {
  margin-top: 6px;
  padding: 6px 10px;
  background: #000;
  color: #fff;
  font-size: 12px;
  border-radius: 12px;
  white-space: nowrap;
}

@keyframes viberPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(115, 96, 242, 0.6);
  }
  70% {
    transform: scale(1.08);
    box-shadow: 0 0 0 18px rgba(115, 96, 242, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(115, 96, 242, 0);
  }
}

.shevron {
  position: fixed;
  top: 600px;
  bottom: 120px;
  right: 25px;
  z-index: 15;
}

@media (max-width: 767px) {
  .viber-widget {
    bottom: auto;
    top: 120px;
  }

  .viber-widget__icon {
    width: 80px;
    height: 80px;
  }

  .viber-widget__label {
    font-size: 11px;
  }

  .shevron {
    top: auto;
    bottom: 30px;
    right: 15px;
  }
}
</style>