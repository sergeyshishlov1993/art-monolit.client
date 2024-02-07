<template>
  <div class="wrapper">
    <ui-text-h1 class="center">ПРО НАС</ui-text-h1>

    <div class="wrapper__text">
      <img src="~/assets/img/aboutOur.webp" alt="about" />

      <div class="text">
        <ui-text-h3 class="fw-300">
          <span class="title">Давайте знайомитись !</span>
          <br />
          Наша гранітна майстерня, вже багато років (з 2007 року), вважається
          однією з найкращих у м. Запоріжжя. Ми пропонуємо вашій увазі надгробні
          пам’ятники із граніту, а також виготовляємо із бетону. Наші вироби
          відомі найвищою якістю, доступною ціною і багаторічною гарантією.<br />
          Ми здійснюємо весь комплекс робіт:
        </ui-text-h3>

        <div class="wrapper__icon mt-31">
          <icon-hammer />
          <ui-text-h4 class="ml-15">Розробка макету </ui-text-h4>
        </div>

        <div class="wrapper__icon mt-25">
          <icon-hammer />
          <ui-text-h4 class="ml-15"
            >Виготовлення, доставка замовлення
          </ui-text-h4>
        </div>

        <div class="wrapper__icon mt-25">
          <icon-hammer />
          <ui-text-h4 class="ml-15">Благоустрій місць поховання</ui-text-h4>
        </div>

        <div class="wrapper__icon mt-25">
          <icon-hammer />
          <ui-text-h4 class="ml-15"
            >Укладення тротуарної облицювальна плитки
          </ui-text-h4>
        </div>

        <div class="wrapper__icon mt-25">
          <icon-hammer />
          <ui-text-h4 class="ml-15"
            >Встановлення столів, лавок, огорож
          </ui-text-h4>
        </div>

        <ui-text-h3 class="fw-300 mt-31"
          >Завжди в наявності великий вибір стелл з натурального граниту від
          виробника. На Ваш вибір одинарні та двійні моделі. Оформлення
          пам’ятника: ручна робота або на верстаті. Також виготовимо виріб під
          замовлення за Вашим ескізом.<br />
          Портрети виготовляємо станком - 100% схожості
        </ui-text-h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconHammer from "~/assets/icon/IconHammer.vue";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 50px;
  &__text {
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  &__icon {
    display: flex;
  }
}

.text {
  direction: flex;
  flex-direction: column;
}
.title {
  display: block;
}
.center {
  text-align: center;
}
.fw-300 {
  font-weight: 300;
  line-height: revert;
}

.ml-15 {
  margin-left: 15px;
}
.mt-25 {
  margin-top: 25px;
}
.mt-31 {
  margin-top: 31px;
}
img {
  max-width: 50%;
  filter: drop-shadow(10px 10px 15px #000);
}

@media screen and (max-width: 1281px) {
  .wrapper__text {
    display: block;
    margin-top: 100px;
  }

  img {
    max-width: 100%;
    margin-bottom: 50px;
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 70px 20px;
  }
  .wrapper__text {
    margin-top: 70px;
  }
}
</style>
