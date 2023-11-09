<template>
  <div class="wrapper">
    <ui-text-h3 class="white">гранітна майстерня</ui-text-h3>
    <h1>АРТ - МОНОЛІТ</h1>
  </div>
</template>

<script setup>
import UITextH3 from "~/components/UI/UiTextH3.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 204px 0 312px 118px;
  background: url(~/assets/img/mainBg.jpeg) center top / cover no-repeat;
}
h1 {
  margin-top: 19px;
  font-family: Roboto;
  font-size: 33px;
  font-weight: 700;
  color: #82642d;
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
