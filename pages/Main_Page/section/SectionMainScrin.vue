<template>
  <div>
    <div class="wrapper">
      <ui-text-h3 class="white">гранітна майстерня</ui-text-h3>
      <h1>АРТ - МОНОЛІТ</h1>
    </div>

    <promo-ticker
        :text="[
        'Знижки на індивідуальні замовлення та безкоштовний прорахунок',
         ]"
    />
  </div>
</template>

<script setup lang="ts">
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import PromoTicker from "~/components/Block/PromoTicker.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 204px 0 312px 118px;
  background: url(~/assets/img/mainBg.webp) center top / cover no-repeat;
}

h1 {
  margin-top: 19px;
  font-family: Roboto;
  font-size: 33px;
  font-weight: 700;

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

.white {
  color: white;
}

@media screen and (max-width: 1199px) {
  .wrapper {
    padding: 204px 0 200px 25px;
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 140px 0 150px 25px;
  }

  h1 {
    font-size: 25px;
  }
}
</style>
