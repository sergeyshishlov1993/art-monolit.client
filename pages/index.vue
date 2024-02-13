<template>
  <div>
    <section-main-scrin />
    <section-catalog-preview />
    <section-our-works />
    <!-- <section-about id="about" /> -->
    <div class="wrapper_about" id="about">
      <ui-text-h1 class="center">ПРО НАС</ui-text-h1>

      <div class="wrapper_about__text">
        <img src="~/assets/img/aboutOur.webp" alt="about" />

        <div class="text">
          <ui-text-h3 class="fw-300">
            <span class="title">Давайте знайомитись !</span>
            <br />
            Наша гранітна майстерня, вже багато років (з 2007 року), вважається
            однією з найкращих у м. Запоріжжя. Ми пропонуємо вашій увазі
            надгробні пам’ятники із граніту, а також виготовляємо із бетону.
            Наші вироби відомі найвищою якістю, доступною ціною і багаторічною
            гарантією.<br />
            Ми здійснюємо весь комплекс робіт:
          </ui-text-h3>

          <div class="wrapper_about__icon mt-31">
            <icon-hammer />
            <ui-text-h4 class="ml-15">Розробка макету </ui-text-h4>
          </div>

          <div class="wrapper_about__icon mt-25">
            <icon-hammer />
            <ui-text-h4 class="ml-15"
              >Виготовлення, доставка замовлення
            </ui-text-h4>
          </div>

          <div class="wrapper_about__icon mt-25">
            <icon-hammer />
            <ui-text-h4 class="ml-15">Благоустрій місць поховання</ui-text-h4>
          </div>

          <div class="wrapper_about__icon mt-25">
            <icon-hammer />
            <ui-text-h4 class="ml-15"
              >Укладення тротуарної облицювальна плитки
            </ui-text-h4>
          </div>

          <div class="wrapper_about__icon mt-25">
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
    <section-contact />
    <section-map id="map" />
  </div>
</template>

<script setup>
import SectionMainScrin from "./Main_Page/section/SectionMainScrin.vue";
import SectionCatalogPreview from "./Main_Page/section/SectionCatalogPreview.vue";
import SectionOurWorks from "./Main_Page/section/SectionOurWorks.vue";
// import SectionAbout from "./Main_Page/section/SectionAbout.vue";
import SectionContact from "./Main_Page/section/SectionContact.vue";
import SectionMap from "./Main_Page/section/SectionMap.vue";
import IconHammer from "~/assets/icon/IconHammer.vue";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";

const imageUrl = new URL(`/assets/img/aboutOur.webp`, import.meta.url).href;

useHead({
  title: "АРТ - МОНОЛІТ",
  meta: [
    {
      hid: "description-page",
      name: "description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, виготовлення під ключ за 30 днів, біля 3000 задовелених кліентів, виготовлення памʼятників для військовослужбовців, велике резноманіття одинарних, подвійних памʼятників, телефон для довідок +380-50-852-05-94",
    },
    {
      hid: "keywords-page",
      name: "keywords",
      content:
        "купить мраморные и гранитные памятники, памятники Запорожье, гранитные памятники, купить гранитный памятник в Запорожье, красивые надгробные памятники, качественые надгробные памятники в запорожье, памятники под ключ, памятники под ключ в запорожье, одинарные памятники, двойные памятники,одинарные памятники в Запорожье , двойные памятники в Запорожье, бюджетыне гранитные памятники в запорожье купить, пам'ятники для військових, пам'ятники для військових купити в запоріжжі, памятники гранитные запорожье, гранитная ваза купить в запорожье, гранитные памятники запорожье, памятники из мрамора запорожье, гранитные памятники запорожье цена, памятники на кладбище святого николая запорожье цены  ",
    },

    {
      name: "robots",
      content: "index, follow",
    },

    {
      hid: "og:title-page",
      property: "og:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "og:description-page",
      property: "og:description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "og:image-page",
      property: "og:image",
      content: imageUrl,
    },
    {
      hid: "og:url-page",
      property: "og:url",
      content: imageUrl,
    },
    {
      hid: "og:image-page",
      property: "og:image:width",
      content: 800,
    },
    {
      hid: "og:image-page",
      property: "og:image:height",
      content: 800,
    },
    {
      hid: "og:type-page",
      property: "og:type",
      content: "website",
    },
    {
      hid: "twitter:card-page",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title-page",
      name: "twitter:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "twitter:description-page",
      name: "twitter:description",
      content:
        "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "twitter:image-page",
      name: "twitter:image",
      content: imageUrl,
    },
    {
      hid: "twitter:url-page",
      name: "twitter:url",
      content: imageUrl,
    },

    {
      hid: "og:image-page",
      property: "og:image:width",
      content: 800,
    },
    {
      hid: "og:image-page",
      property: "og:image:height",
      content: 800,
    },
  ],

  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-CGMKTLYTRQ",
      async: true,
    },

    {
      innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CGMKTLYTRQ');
          `,
    },
  ],
});
</script>

<style lang="scss" scoped>
.wrapper_about {
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
  .wrapper_about__text {
    display: block;
    margin-top: 100px;
  }

  img {
    max-width: 100%;
    margin-bottom: 50px;
  }
}

@media screen and (max-width: 767px) {
  .wrapper_about {
    padding: 70px 20px;
  }
  .wrapper_about__text {
    margin-top: 70px;
  }
}
</style>
