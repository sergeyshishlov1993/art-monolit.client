<template>
  <div class="container">
    <footer>
      <div class="wrapper__logo">
        <icon-logo class="logo" />
      </div>

      <div class="wrapper__address">
        <ui-text-h4 class="white">м.Запоріжжя</ui-text-h4>
        <ui-text-h4 class="white mt-14">вул. Космічна 63</ui-text-h4>
      </div>

      <div class="schedule">
        <ui-text-h4 class="white">пн-сб: 09:00 до 16:00</ui-text-h4>
        <ui-text-h4 class="white mt-14">вс вихідний</ui-text-h4>
      </div>

      <div class="wrapper__phone">
        <icon-phone class="phone mr-10" />

        <div>
          <ui-text-h4 class="white">
            <a href="+380508520594">+380508520594</a>
          </ui-text-h4>

          <ui-text-h4 class="white mt-14">
            <a href="+380508520590">+380508520590</a>
          </ui-text-h4>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import UiTextH4 from "~/components/UI/UiTextH4";
import IconLogo from "~/assets/icon/IconLogo.vue";
import IconPhone from "~/assets/icon/IconPhone.vue";
</script>

<style lang="scss" scoped>
footer {
  padding: 25px 50px;
  background: #000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 2px solid rgba(130, 100, 45, 1);
}

.wrapper__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper__phone {
  display: flex;
}

.white {
  color: white;
}
a {
  color: inherit;
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
.mt-7 {
  margin-top: 7px;
}
.mr-10 {
  margin-right: 10px;
}

.mt-14 {
  margin-top: 14px;
}
.mt-25 {
  margin-top: 25px;
}

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}

@media screen and (max-width: 1023px) {
  footer {
    padding: 14px 20px;
  }

  .logo {
    max-width: 100px;
  }

  .phone {
    max-width: 30px;
  }
}

@media screen and (max-width: 767px) {
  footer {
    flex-direction: column;
  }

  .logo {
    max-width: 80px;
  }

  .phone {
    display: none;
  }

  .wrapper__address {
    margin-top: 20px;
    text-align: center;
  }

  .wrapper__phone {
    margin-top: 20px;
  }

  .schedule {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .mt-7 {
    margin-top: 4px;
  }
  .mt-14 {
    margin-top: 10px;
  }
}
</style>
