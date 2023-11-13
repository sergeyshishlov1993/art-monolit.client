<template>
  <div class="wrapper">
    <ui-text-h1 class="white">ЗВЯЗАТИСЯ ЗІ МНОЮ</ui-text-h1>

    <form class="mt-150">
      <ui-input class="input" placeholder="Ваше ім’я" type="text" />
      <ui-input class="mt-45 input" placeholder="Ваш номер" type="phone" />
      <ui-btn class="mt-45 button">
        <ui-text-h3 class="fw-500 white">ПЕРЕДЗВОНИТЬ МЕНІ</ui-text-h3>
      </ui-btn>
    </form>
  </div>
</template>

<script setup>
import UiTextH1 from "~/components/UI/UiTextH1";
import UiTextH3 from "~/components/UI/UiTextH3";
import UiInput from "~/components/UI/UiInput";
import UiBtn from "~/components/UI/UiBtn";
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 150px 0;
  background: rgba(0, 0, 0, 1);
}

.white {
  text-align: center;
  color: white;
}

.button {
  width: 500px;
  height: 65px;
  background: #000;
  border: solid 2px white;
  &:hover {
    background: white;
    h2 {
      color: #000;
    }
  }
}

.input {
  width: 500px;
  height: 65px;
}

form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.mt-150 {
  margin-top: 150px;
}
.mt-45 {
  margin-top: 45px;
}
.fw-500 {
  font-weight: 500;
}

@media screen and (max-width: 1023px) {
  .wrapper {
    padding: 100px 20px;
  }

  .button {
    max-width: 400px;
  }

  .input {
    max-width: 400px;
  }
}

@media screen and (max-width: 767px) {
  .button {
    max-width: 300px;
  }

  .input {
    max-width: 300px;
  }
}

@media screen and (max-width: 766px) {
  .wrapper {
    padding: 80px 10px;
  }
  .button {
    max-width: 270px;
  }

  .input {
    max-width: 270px;
  }
  .mt-150 {
    margin-top: 100px;
  }
}
</style>
