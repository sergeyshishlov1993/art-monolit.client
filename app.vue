<template>
  <div class="wrapper">
    <TheHeader />

    <div class="container">
      <NuxtPage />

      <icon-shevron
        class="shevron"
        v-if="showScrollToTop"
        @click="scrollToTop"
      />
    </div>

    <the-footer />
  </div>
</template>

<script setup>
const imageUrl = new URL(`/assets/img/catalog/war.webp`, import.meta.url).href;
import TheHeader from "~/components/Block/TheHeader";
import IconShevron from "./assets/icon/IconShevron.vue";
import TheFooter from "~/components/Block/TheFooter";

import useScrollToTop from "./utils/useScrollToTop";

const { showScrollToTop, scrollToTop } = useScrollToTop();

useHead({
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=AW-16514962201",
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16514962201');
        gtag('event', 'conversion', {'send_to': 'AW-16514962201/qellCICYw9YZEJmm-cI9'});
      `,
      type: "text/javascript",
    },

    {
      children: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "oxvx4l2v76");`,
      type: "text/javascript",
    },
  ],

  link: [
    {
      rel: "preload",
      href: "https://firebasestorage.googleapis.com/v0/b/art-monolit-8898c.appspot.com/o/logo%2F%D0%90%D0%9C.jpg?alt=media&token=5fa568a8-8d6d-486d-8dc0-4e2f00a1dad4",
      as: "image",
    },
  ],

  meta: [
    {
      hid: "main-description",
      name: "description",
      content:
        "Каталог з одинарними та подвійми пам'ятниками у місті Запоржжя, Пам'ятнки під ключ, Пам'ятники для військових, Меморіальні пам'ятники, Виготовлення пам'ятників під ключ к місті Запоріжжя",
    },

    {
      hid: "main-keywords",
      name: "keywords",
      content:
        "купити одинарні пам'ятники у Запоріжжі, купити подвійний пам'ятник у Запоріжжі,пам'ятник для військових, купить памятник одинарный, цена одинарного памятника запорожье, цена двойного памятника запорожье, установка памятников под ключ запорожье  ",
    },

    {
      hid: "og:title-main",
      property: "og:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "og:description-main",
      property: "og:description",
      content:
        "каталог з одинарними та подвійми пам'ятниками у місті Запоржжя, пам'ятнки під ключ, пам'ятники для військових, меморіальні пам'ятники, виготовлення пам'ятників під ключ к місті Запоріжжя",
    },
    {
      hid: "og:image-main",
      property: "og:image",
      content:
        "https://firebasestorage.googleapis.com/v0/b/art-monolit-8898c.appspot.com/o/logo%2F%D0%90%D0%9C.jpg?alt=media&token=5fa568a8-8d6d-486d-8dc0-4e2f00a1dad4",
    },
    {
      hid: "og:url-main",
      property: "og:url",
      content:
        "https://firebasestorage.googleapis.com/v0/b/art-monolit-8898c.appspot.com/o/logo%2F%D0%90%D0%9C.jpg?alt=media&token=5fa568a8-8d6d-486d-8dc0-4e2f00a1dad4",
    },
    {
      hid: "og:type-main",
      property: "og:type",
      content: "website",
    },
    {
      name: "google-site-verification",
      content: "x3lktmFtn_dq-e5JemJe2aVqSQs3F8t5ttEtM_Lio9k",
    },

    {
      innerHTML: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2021575691610536');
      fbq('track', 'PageView');
      `,
    },

    {
      name: "facebook-domain-verification",
      content: "2yjcqfjbbbf03oiqfngtlkweldzmpy",
    },
  ],
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.container {
  padding: 0;
  position: relative;
}
.shevron {
  position: fixed;
  top: 600px;
  right: 25px;
  fill: rgba(130, 100, 45, 1);
  z-index: 15;
}
@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}
</style>
