<template>
  <div class="container">
    <div class="spinner-border" role="status" v-if="isLoading"></div>

    <div class="about__product" :class="{ substrate: showModal }" v-else>
      <div class="navigation">
        <nuxt-link to="/">
          <ui-text-h4 class="fw-500">головна</ui-text-h4>
        </nuxt-link>

        <nuxt-link to="/catalog">
          <ui-text-h4 class="fw-500">/каталог</ui-text-h4>
        </nuxt-link>

        <ui-text-h4 class="fw-500"
          >/{{ titelToLoverCase.toLowerCase() }}</ui-text-h4
        >
      </div>

      <div class="product">
        <div class="mr-40">
          <div class="sceletor" v-if="isLoadingImg"></div>
          <img
            :src="currentProduct[0].src.stringValue || currentProduct[0].src"
            alt="catalog__item"
            loading="lazy"
            @load="isLoadingImg = false"
          />
        </div>

        <div class="description">
          <ui-text-h1>{{
            currentProduct[0].title.stringValue || currentProduct[0].title
          }}</ui-text-h1>
          <ui-text-h3 class="fw-500 mt-40"
            >РОЗМІР :
            {{ currentProduct[0].size.stringValue || currentProduct[0].size }}
            ММ</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >МАТЕРІАЛ :
            {{
              currentProduct[0].material.stringValue ||
              currentProduct[0].material
            }}</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >ТЕРМІН ВИГОТОВЛЕННЯ :
            {{ currentProduct[0].term.stringValue || currentProduct[0].term }}
            ДНІВ</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >ДОСТАВКА :
            {{
              currentProduct[0].delivery.stringValue ||
              currentProduct[0].delivery
            }}</ui-text-h3
          >
          <ui-text-h3 class="fw-500 mt-20"
            >КОМПЛЕКТАЦІЯ :
            {{
              currentProduct[0].equipment.stringValue ||
              currentProduct[0].equipment
            }}</ui-text-h3
          >

          <ui-btn class="button" @click="getPrice" :disabled="showModal">
            <ui-text-h3>ДІЗНАТИСЯ ВАРТІСТЬ</ui-text-h3>
          </ui-btn>
        </div>
      </div>
      <modal-call-back
        v-if="showModal"
        @closeModal="showModal = false"
        :qwery="route.query.pixel"
        :currentPath="route.fullPath"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import { useCatalogData } from "~/stores/catalogData";
import { useRoute } from "vue-router";
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import UiBtn from "~/components/UI/UiBtn";
import ModalCallBack from "~/components/Block/Modal/ModalCallBack.vue";

const { getItemProduct, activeTab, currentProduct, changeTab } =
  useCatalogData();
const route = useRoute();
const isLoading = ref(true);
const isLoadingImg = true;

onMounted(async () => {
  try {
    changeTab(route.query.activeTab);

    let productData = await getItemProduct(
      `product/catalog/${activeTab[0]}`,
      route.params.id
    );

    isLoading.value = false;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
});
const titelToLoverCase = computed(() => {
  return currentProduct[0].title.stringValue || currentProduct[0].title;
});

const showModal = ref(false);
function getPrice() {
  showModal.value = true;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

useHead(() => {
  if (currentProduct && currentProduct.length > 0) {
    const product = currentProduct[0];

    const title =
      product.title && product.title.stringValue
        ? product.title.stringValue
        : product.title;

    const image =
      product.src && product.src.stringValue
        ? product.src.stringValue
        : product.src;

    const term =
      product.term && product.term.stringValue
        ? product.term.stringValue
        : product.term;

    const material =
      product.material && product.material.stringValue
        ? product.material.stringValue
        : product.material;

    const size =
      product.size && product.size.stringValue
        ? product.size.stringValue
        : product.material;

    return {
      title: `Памятники Запорожье - Гранитные Памятники Запорожье - Изготовление памяинмков в запорожье - Цена памятника из гранита под ключ - Одинарный памятник под ключ - Двойной памятник под ключ ${title} `,
      meta: [
        {
          hid: "description:id",
          name: "description",
          content: `назва ${title} розмір ${size} виготовимо з ${material} за ${term} днів, пам'ятник запоріжжя гранітна майстерння арт моноліт, одинарні та подвійні памʼятники в запооріжжі `,
        },

        {
          hid: "keywords:id",
          name: "keywords",
          content:
            "одинарні, подвійні памʼятники в запоріжжі, памʼятники для військових, гранітна майстерня арт моноліт, арт моноліт Запоріжжя ",
        },

        {
          hid: "og:title:id",
          property: "og:title",
          content: "АРТ - МОНОЛІТ",
        },
        {
          hid: "og:description:id",
          property: "og:description",
          content: `${title} пам'ятник купити в запоріжжі`,
        },

        {
          hid: "og:image:id",
          property: "og:image",
          content: image,
        },
        {
          hid: "og:image:id",
          property: "og:image:width",
          content: 800,
        },
        {
          hid: "og:image:id",
          property: "og:image:height",
          content: 800,
        },
        {
          hid: "og:url:id",
          property: "og:url",
          content: image,
        },
        {
          hid: "og:type:id",
          property: "og:type",
          content: "article",
        },
        {
          hid: "twitter:card:id",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title:id",
          name: "twitter:title",
          content: "АРТ - МОНОЛІТ",
        },
        {
          hid: "twitter:description:id",
          name: "twitter:description",
          content: `${title}`,
        },
        {
          hid: "twitter:image:id",
          name: "twitter:image",
          content: image,
        },
        {
          hid: "twitter:url:id",
          name: "twitter:url",
          content: image,
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
    };
  } else {
    return {
      title: "АРТ - МОНОЛІТ",
      meta: [
        {
          hid: "og:title-id",
          property: "og:title",
          content: "АРТ - МОНОЛІТ",
        },

        {
          hid: "og:description-id",
          property: "og:description",
          content:
            "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
        },

        {
          hid: "og:image:id",
          property: "og:image:width",
          content: 400,
        },
        {
          hid: "og:image:id",
          property: "og:image:height",
          content: 600,
        },

        {
          hid: "og:image-id",
          property: "og:image",
          content: "",
        },

        {
          hid: "og:url-id",
          property: "og:url",
          content: "",
        },

        {
          hid: "og:type-id",
          property: "og:type",
          content: "article",
        },

        {
          hid: "twitter:card-id",
          name: "twitter:card",
          content: "summary_large_image",
        },

        {
          hid: "twitter:title-id",
          name: "twitter:title",
          content: "АРТ - МОНОЛІТ",
        },

        {
          hid: "twitter:description-id",
          name: "twitter:description",
          content:
            "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
        },

        {
          hid: "twitter:image-id",
          name: "twitter:image",
          content: "",
        },

        {
          hid: "twitter:url-id",
          name: "twitter:url",
          content: "",
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
    };
  }
});
</script>

<style lang="scss" scoped>
.about__product {
  padding: 75px 20px 20px 20px;
}

.navigation {
  display: flex;
  a {
    color: inherit;
  }
}

.product {
  padding: 100px 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  img {
    max-width: 100%;
    height: 600px;
    width: auto;
    border-radius: 20px;
    z-index: 2;

    box-shadow: -3px 49px 24px -26px rgba(34, 60, 80, 0.76);
    border: none;
  }
}

.description {
  display: flex;
  flex-direction: column;
}

.button {
  margin-top: 265px;
  &:hover {
    background: #000;
    color: white;
  }
}

.sceletor {
  position: absolute;
  top: 0;
  max-width: 100%;
  height: 600px;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  animation: loading 1.5s infinite;
  z-index: 1;
}

@keyframes loading {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}

.substrate {
  background: rgba(0, 0, 0, 0.25);
}
.fw-500 {
  font-weight: 500;
}

.mt-20 {
  margin-top: 20px;
}
.mr-40 {
  position: relative;
  max-width: 100%;
  margin-right: 40px;
}
.mt-40 {
  margin-top: 40px;
}

.spinner-border {
  display: block;
  margin: 0 auto;
  margin-top: 200px;
  margin-bottom: 200px;
}

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}

@media screen and (max-width: 1440px) {
  .product {
    padding: 100px 0;
  }
}

@media screen and (max-width: 1199px) {
  .product {
    padding: 50px 20px;
    flex-direction: column;
    align-items: center;
  }

  .description {
    margin-top: 50px;
    width: 100%;
  }
  .mr-40 {
    margin-right: 0;
  }
}

@media screen and (max-width: 1023px) {
  .product {
    padding: 50px 0;
    img {
      height: auto;
    }
  }
}
</style>
