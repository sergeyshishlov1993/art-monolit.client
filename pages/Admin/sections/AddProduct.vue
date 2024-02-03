<template>
  <div class="wrapper">
    <div class="wrapper__tabs">
      <div
        class="tab mr-50"
        :class="{ active: activeTab === 'catalog' }"
        @click="activeTab = 'catalog'"
      >
        <ui-text-h4>КАТАЛОГ</ui-text-h4>
      </div>

      <div
        class="tab scrin-425"
        :class="{ active: activeTab == 'ourWork' }"
        @click="activeTab = 'ourWork'"
      >
        <ui-text-h4>НАШІ РОБОТИ</ui-text-h4>
      </div>
    </div>

    <ui-text-h2 class="center mt-50"
      >Форма для завантаження карток товару</ui-text-h2
    >

    <div v-if="activeTab === 'catalog'">
      <admin-form-category
        v-if="!showSuccessMesage && !showErrorMessage && !showSpiner"
        class="mt-50"
        @formData="loadProductCard"
        @file="loadFileToStorage"
      />

      <div class="loader" v-else>
        <div class="spinner-border" role="status" v-if="showSpiner"></div>
        <success-mesage v-if="showSuccessMesage" />
        <error-message v-if="showErrorMessage" />
      </div>
    </div>

    <div v-else>
      <form-our-work
        v-if="!showSuccessMesage && !showErrorMessage"
        class="mt-50"
        @formData="loadProductCard"
        @file="loadFileToStorage"
      />

      <div class="loader" v-else>
        <div class="spinner-border" role="status" v-if="showSpiner"></div>
        <success-mesage v-if="showSuccessMesage" />
        <error-message v-if="showErrorMessage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { app } from "../firebaseConfig";
import { useCatalogData } from "~/stores/catalogData";

import { ref } from "vue";
import UiTextH2 from "~/components/UI/UiTextH2.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";

import AdminFormCategory from "../components/AdminFormCatalog.vue";
import FormOurWork from "../components/FormOurWork.vue";
import SuccessMesage from "../components/SuccessMesage.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

const storage = getStorage(app);
const db = getFirestore(app);
const now = Timestamp.now();
const { getFirebaseData } = useCatalogData();

const activeTab = ref("catalog");
const downloadURL = ref("");
const showSuccessMesage = ref(false);
const showErrorMessage = ref(false);
const showSpiner = ref(false);

async function loadFileToStorage(file) {
  try {
    const storagePath = `files/${file.name}`;
    const storageReference = storageRef(storage, storagePath);

    await uploadBytes(storageReference, file);

    downloadURL.value = await getDownloadURL(storageReference);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
}

async function loadProductCard(formData, file, type, spiner) {
  showSpiner.value = spiner;
  try {
    const cardCollection = collection(db, `product/${activeTab.value}/${type}`);
    const documentId = uuidv4();

    await loadFileToStorage(file);

    await addDoc(
      cardCollection,
      { ...formData, src: downloadURL.value, timestamp: now },
      documentId
    );
    showSpiner.value = false;
    showSuccessMesage.value = true;

    // getFirebaseData(activeTab.value, "product");

    setTimeout(() => {
      showSuccessMesage.value = false;
    }, 2000);
  } catch (e) {
    showSpiner.value = false;
    showErrorMessage.value = true;

    setTimeout(() => {
      showErrorMessage.value = false;
    }, 2000);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 100px;
  &__tabs {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.tab {
  padding: 12px;
  background: white;
  border-radius: 20px;
  box-shadow: 4px 9px 15px 1px rgba(34, 60, 80, 0.35);
  border: none;
  width: 220px;
  h2 {
    text-align: center;
  }
}
.spinner-border {
  display: block;
  margin: auto;
  margin-top: 40px;
}
.mr-50 {
  margin-right: 50px;
}
.mt-50 {
  margin-top: 50px;
}

.center {
  text-align: center;
}
.active {
  background: #000;
  color: white;
}
.loader {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1199px) {
  .wrapper {
    padding: 50px;
  }
}

@media screen and (max-width: 767px) {
  form {
    width: 100%;
  }

  .mr-50 {
    margin-right: 20px;
  }
}
@media screen and (max-width: 424px) {
  .wrapper {
    padding: 30px 0;
  }
}
</style>
