<!--<template>-->
<!--  <div class="wrapper">-->
<!--    <TheHeader />-->

<!--    <div class="container">-->
<!--      <NuxtPage />-->

<!--      <a-->
<!--          class="viber-widget"-->
<!--          :href="viberChatLink"-->
<!--          aria-label="Написати менеджеру у Viber"-->
<!--      >-->
<!--        <IconViber class="viber-widget__icon" />-->
<!--        <span class="viber-widget__label">Написати менеджеру</span>-->
<!--      </a>-->

<!--    </div>-->

<!--    <TheFooter />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import TheHeader from "~/components/Block/TheHeader";-->
<!--import TheFooter from "~/components/Block/TheFooter";-->
<!--import IconViber from "~/assets/icon/IconViber.vue";-->
<!--import useScrollToTop from "~/utils/useScrollToTop";-->
<!--const viberChatLink: string = "viber://chat?number=%2B380985024333";-->
<!--</script>-->

<!--<style lang="scss">-->
<!--.container {-->
<!--  min-width: 100%;-->
<!--  padding: 0;-->
<!--}-->
<!--</style>-->

<!--<style scoped lang="scss">-->
<!--.wrapper {-->
<!--  min-height: 100vh;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.container {-->
<!--  position: relative;-->
<!--}-->

<!--.viber-widget {-->
<!--  position: fixed;-->
<!--  right: 10px;-->
<!--  bottom: 30px;-->
<!--  z-index: 10;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  text-decoration: none;-->
<!--}-->

<!--.viber-widget__icon {-->
<!--  width: 80px;-->
<!--  height: 80px;-->
<!--  background: rgba(115, 96, 242, 0.55);-->
<!--  border-radius: 50%;-->
<!--  padding: 14px;-->
<!--  box-shadow: 0 8px 9px rgba(0, 0, 0, 0.18);-->
<!--  animation: viberPulse 2s infinite;-->
<!--}-->

<!--.viber-widget__label {-->
<!--  margin-top: 4px;-->
<!--  padding: 5px 8px;-->
<!--  background: rgba(0, 0, 0, 0.7);-->
<!--  color: rgba(255, 255, 255, 0.9);-->
<!--  font-size: 11px;-->
<!--  border-radius: 12px;-->
<!--  white-space: nowrap;-->
<!--}-->

<!--@keyframes viberPulse {-->
<!--  0% {-->
<!--    transform: scale(1);-->
<!--    box-shadow: 0 0 0 0 rgba(115, 96, 242, 0.45);-->
<!--  }-->
<!--  70% {-->
<!--    transform: scale(1.1);-->
<!--    box-shadow: 0 0 0 20px rgba(115, 96, 242, 0);-->
<!--  }-->
<!--  100% {-->
<!--    transform: scale(1);-->
<!--    box-shadow: 0 0 0 0 rgba(115, 96, 242, 0);-->
<!--  }-->
<!--}-->

<!--.shevron {-->
<!--  position: fixed;-->
<!--  right: 20px;-->
<!--  bottom: 30px;-->
<!--  z-index: 15;-->
<!--}-->

<!--@media (max-width: 767px) {-->

<!--  .viber-widget__icon {-->
<!--    width: 70px;-->
<!--    height: 70px;-->
<!--  }-->

<!--  .viber-widget__label {-->
<!--    font-size: 10px;-->
<!--  }-->

<!--  .shevron {-->
<!--    right: 15px;-->
<!--    bottom: 20px;-->
<!--  }-->
<!--}-->
<!--</style>-->


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
        <span class="viber-widget__icon-wrap" aria-hidden="true">
          <IconViber class="viber-widget__icon" />
        </span>
        <span class="viber-widget__label">Написати менеджеру</span>
      </a>
    </div>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from "~/components/Block/TheHeader";
import TheFooter from "~/components/Block/TheFooter";
import IconViber from "~/assets/icon/IconViber.vue";
import useScrollToTop from "~/utils/useScrollToTop";

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
  right: 10px;
  bottom: 30px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.viber-widget__icon-wrap {
  width: 80px;
  height: 80px;
  background: rgba(115, 96, 242, 0.55);
  border-radius: 50%;
  padding: 14px;
  box-shadow: 0 8px 9px rgba(0, 0, 0, 0.18);
  animation: viberPulse 2s infinite;
  overflow: hidden;
  display: grid;
  place-items: center;
}

.viber-widget__icon {
  width: 100%;
  height: 100%;
  display: block;
}

.viber-widget__label {
  margin-top: 4px;
  padding: 5px 8px;
  background: rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.9);
  font-size: 11px;
  border-radius: 12px;
  white-space: nowrap;
}

@keyframes viberPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(115, 96, 242, 0.45);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 20px rgba(115, 96, 242, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(115, 96, 242, 0);
  }
}

.shevron {
  position: fixed;
  right: 20px;
  bottom: 30px;
  z-index: 15;
}

@media (max-width: 767px) {
  .viber-widget__icon-wrap {
    width: 70px;
    height: 70px;
  }

  .viber-widget__label {
    font-size: 10px;
  }

  .shevron {
    right: 15px;
    bottom: 20px;
  }
}
</style>
