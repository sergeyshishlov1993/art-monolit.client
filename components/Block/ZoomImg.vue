<template>
  <Teleport to="body">
    <div class="zoom-overlay" @click.stop="$emit('close')">

      <button class="close-btn" @click.stop="$emit('close')">
        ✕
      </button>

      <div class="zoom-container" @click.stop>
        <img :src="zoomPathImg[0]" alt="img big" />

        <div class="zoom-cta">
          <span class="cta-text">Сподобалась робота?</span>
          <button class="cta-btn" @click.stop="$emit('openModal')">
            ДІЗНАТИСЯ ВАРТІСТЬ
          </button>
        </div>
      </div>

    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useCatalogData } from "~/stores/catalogData";
const {
  activeTab,
  changeTab,
  getData,
  getPageItems,
  pagedData,
  getPathZoomImg,
  zoomPathImg,
} = useCatalogData();

const isLoading = ref(false);
const showZoomImg = ref(false);
const showModal = ref(false);
const screenWidth = ref(0);
const imageUrl = new URL(`/assets/img/ourWork/1.webp`, import.meta.url).href;

watch([showModal, showZoomImg], ([newModal, newZoom]) => {
  if (newModal || newZoom) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onMounted(async () => {
  await getData("ourWork", "product");
  getPageItems(1);

  isLoading.value = true;

  if (typeof window !== "undefined") {
    screenWidth.value = window.innerWidth;
    const handleResize = () => {
      screenWidth.value = window.innerWidth;
    };
    window.addEventListener("resize", handleResize);

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    });
  }
});

useHead({
  title:
      "Памятники Запорожье - Установка гранитных памятников запорожье - Качественые недорогие памятники  - Гранитные памятники запорожье цена",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
          "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
          "купить мраморные и гранитные памятники, памятники Запорожье, гранитные памятники, купить гранитный памятник в Запорожье, красивые надгробные памятники, качественые надгробные памятники в запорожье, памятники под ключ, памятники под ключ в запорожье, одинарные памятники, двойные памятники,одинарные памятники в Запорожье , двойные памятники в Запорожье, бюджетыне гранитные памятники в запорожье купить, пам'ятники для військових, пам'ятники для військових купити в запоріжжі, памятники гранитные запорожье, гранитная ваза купить в запорожье, гранитные памятники запорожье, памятники из мрамора запорожье, гранитные памятники запорожье цена, памятники на кладбище святого николая запорожье цены",
    },
    {
      hid: "og:title",
      property: "og:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "og:description",
      property: "og:description",
      content:
          "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: imageUrl,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: imageUrl,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: "АРТ - МОНОЛІТ",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content:
          "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: imageUrl,
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: imageUrl,
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
      name: "facebook-domain-verification",
      content: "2yjcqfjbbbf03oiqfngtlkweldzmpy",
    },
  ],
});
</script>

<style lang="scss" scoped>
.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 102;
  transition: background 0.2s;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.zoom-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;

  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    user-select: none;
    pointer-events: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .zoom-cta {
    position: absolute;
    bottom: 40px;
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.15);
    padding: 10px 20px;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    z-index: 100;
    pointer-events: auto;
  }

  .cta-text {
    color: #fff;
    font-size: 16px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .cta-btn {
    background: #fff;
    color: #000;
    border: none;
    padding: 12px 24px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.2s, background 0.2s;

    &:hover {
      transform: scale(1.05);
      background: #f0f0f0;
    }
  }

  @media screen and (max-width: 767px) {
    .close-btn {
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
    }

    .cta-text {
      display: none;
    }
    .zoom-cta {
      width: 100%;
      justify-content: center;
      bottom: 20px;
      background: transparent;
      padding: 0 20px;
      backdrop-filter: none;
      border-radius: 0;
    }

    .cta-btn {
      width: 100%;
      padding: 15px;
      font-size: 16px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>