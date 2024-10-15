<template>
  <div>
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
  ],

  meta: [
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
