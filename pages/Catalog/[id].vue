<template>
  <div class="container">
    <div class="spinner-border" role="status" v-if="status === 'pending'"></div>

    <div class="about__product" :class="{ substrate: showModal }" v-else-if="productData">
      <base-breadcrumbs :items="breadcrumbs" />

      <div class="product">
        <div class="mr-40">
          <div class="sceletor" v-if="isLoadingImg"></div>
          <img
              :src="productData.src"
              alt="catalog__item"
              loading="lazy"
              @load="isLoadingImg = false"
          />
        </div>

        <div class="description">
          <ui-text-h1>{{ productData.title }}</ui-text-h1>

          <div class="specs-table-wrapper">
            <table class="specs-table">
              <tbody>
              <tr>
                <td>Розмір</td>
                <td>{{ productData.size }} мм</td>
              </tr>
              <tr>
                <td>Матеріал</td>
                <td>{{ productData.material }}</td>
              </tr>
              <tr>
                <td>Термін виготовлення</td>
                <td>{{ productData.term }} днів</td>
              </tr>
              <tr>
                <td>Доставка</td>
                <td>{{ productData.delivery }}</td>
              </tr>
              <tr>
                <td>Комплектація</td>
                <td>{{ productData.equipment }}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="action-block" v-if="!showModal">
            <ui-btn class="button" @click="getPrice">
              <ui-text-h3>ДІЗНАТИСЯ ВАРТІСТЬ</ui-text-h3>
            </ui-btn>
            <div class="action-hint">Розрахунок вартості безкоштовний</div>
          </div>
        </div>
      </div>

      <div class="modal-wrapper" v-if="showModal">
        <modal-call-back
            @closeModal="showModal = false"
            :qwery="route.query.pixel"
            :currentPath="route.fullPath"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue"
import UiTextH1 from "~/components/UI/UiTextH1.vue"
import UiTextH3 from "~/components/UI/UiTextH3.vue"
import UiBtn from "~/components/UI/UiBtn.vue"
import ModalCallBack from "~/components/Block/Modal/ModalCallBack.vue"
import BaseBreadcrumbs from "~/components/UI/BaseBreadcrumbs.vue"

const route = useRoute()
const isLoadingImg = ref(true)
const showModal = ref(false)
let timerId: ReturnType<typeof setTimeout>

const activeTab = (route.query.activeTab as string) || "single"
const productId = route.params.id as string

const firestoreUrl = `https://firestore.googleapis.com/v1/projects/art-monolit-8898c/databases/(default)/documents/product/catalog/${activeTab}/${productId}`

const { data: rawData, status } = await useAsyncData(
    `product-${activeTab}-${productId}`,
    () => $fetch(firestoreUrl)
)

const getValue = (field: any) => field?.stringValue || field || ""

const productData = computed(() => {
  if (!rawData.value?.fields) return null
  const fields = rawData.value.fields
  return {
    title: getValue(fields.title),
    src: getValue(fields.src),
    size: getValue(fields.size),
    material: getValue(fields.material),
    term: getValue(fields.term),
    delivery: getValue(fields.delivery),
    equipment: getValue(fields.equipment),
  }
})

const breadcrumbs = computed(() => [
  { label: "головна", to: "/" },
  { label: "каталог", to: "/catalog" },
  { label: productData.value?.title?.toLowerCase() || "" },
])

useHead(() => {
  const p = productData.value
  if (!p?.title) return { title: "АРТ - МОНОЛІТ" }
  return {
    title: `Памятники Запорожье - ${p.title} - Цена памятника из гранита`,
    meta: [
      { hid: "description:id", name: "description", content: `Назва ${p.title} розмір ${p.size} виготовимо з ${p.material}` },
      { hid: "og:title:id", property: "og:title", content: "АРТ - МОНОЛІТ" },
      { hid: "og:image:id", property: "og:image", content: p.src },
    ],
  }
})

watch(showModal, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? "hidden" : ""
  }
})

onMounted(() => {
  timerId = setTimeout(() => {
    if (!showModal.value) showModal.value = true
  }, 5000)
})

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ""
  }
  clearTimeout(timerId)
})

function getPrice() {
  showModal.value = true
  window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>

<style lang="scss" scoped>
.about__product { padding: 75px 20px 20px 20px; }

.modal-wrapper {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  :deep(*) { pointer-events: auto; }
}

.product {
  padding: 100px 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;

  img {
    max-width: 100%;
    height: 600px;
    width: auto;
    border-radius: 20px;
    z-index: 2;
    box-shadow: -3px 49px 24px -26px rgba(34, 60, 80, 0.76);
  }
}

.description { display: flex; flex-direction: column; width: 100%; max-width: 500px; }

.specs-table-wrapper {
  margin: 40px 0;
  width: 100%;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;

  td {
    padding: 15px 0;
    border-bottom: 1px solid #e0e0e0;
    font-size: 16px;
    vertical-align: top;

    &:first-child {
      font-weight: 500;
      color: #666;
      width: 40%;
      padding-right: 15px;
    }

    &:last-child {
      font-weight: 600;
      color: #000;
      text-align: right;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.button {
  margin-top: 0;
  width: 100%;
  max-width: 400px;
  &:hover { background: #000; color: white; }
}

.action-hint {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  text-align: center;
  max-width: 400px;
}

.mr-40 { position: relative; max-width: 100%; }
.spinner-border { display: block; margin: 200px auto; }

.sceletor {
  position: absolute;
  top: 0;
  min-width: 100%;
  height: 600px;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  animation: loading 1.5s infinite;
  z-index: 1;
}

@keyframes loading {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

.substrate { background: rgba(0, 0, 0, 0.25); }

@media screen and (min-width: 1440px) {
  .container { min-width: 100%; }
}

@media screen and (max-width: 1440px) {
  .product { padding: 100px 0; }
}

@media screen and (max-width: 1199px) {
  .product { padding: 50px 20px; flex-direction: column; align-items: center; }
  .description { margin-top: 30px; width: 100%; align-items: center; max-width: 100%; }
  .specs-table-wrapper { max-width: 600px; width: 100%; }
}

@media screen and (max-width: 1023px) {
  .product { padding: 50px 0; img { height: auto; } }
}

@media screen and (max-width: 767px) {
  .product { padding-bottom: 100px; }

  .action-block {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    padding: 15px 20px;
    box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button { width: 100%; max-width: 100%; }

  .specs-table {
    td {
      font-size: 14px;
      padding: 10px 0;
    }
  }

  .modal-wrapper {
    padding: 0;
    align-items: flex-end;
    :deep(> *) {
      width: 100% !important;
      height: 100% !important;
      max-width: 100% !important;
      max-height: 100% !important;
      border-radius: 0 !important;
      margin: 0 !important;
    }
  }
}
</style>