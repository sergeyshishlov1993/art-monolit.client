<template>
  <div class="wrapper">
    <div class="admin__catalog">
      <tabs-page
        :selectedTab="activeTab"
        @selec-tab="changeTab"
        class="mr-80"
      />

      <div class="card__wrapper">
        <card-our-work
          v-for="(card, index) in product"
          :key="card.id"
          :src="card.src"
          :id="card.id"
          :index="index"
          :type="card.type"
          @updateFormData="updateDocumentById"
          @remove="removeCard"
        />
      </div>
    </div>

    <div class="pagination">
      <ui-btn class="mr-20 button" @click="getPrevData">
        <ui-text-h3>ПОВЕРНУТИСЯ</ui-text-h3>
      </ui-btn>

      <ui-btn class="button" @click="getNextData">
        <ui-text-h3> ПОКАЗАТИ ЩЕ </ui-text-h3>
      </ui-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import TabsPage from "../../Catalog/components/TabsPage.vue";
import CardOurWork from "../components/CardOurWork.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";

import { app } from "../firebaseConfig";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  doc,
  deleteDoc,
  setDoc,
  query,
  startAfter,
  limit,
  orderBy,
  startAt,
  Timestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);
const now = Timestamp.now();

const activeTab = ref("single");
const product = reactive([]);
const lastDoc = ref(null);

onMounted(getData);

function changeTab(tab) {
  activeTab.value = tab;
  getData();
}

async function getData() {
  const firestoreQuery = query(
    collection(db, `product/ourWork/${activeTab.value}`),
    orderBy("timestamp"),
    limit(8)
  );

  const documentSnapshots = await getDocs(firestoreQuery);

  lastDoc.value = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  product.length = 0;
  const snapshot = await getDocs(firestoreQuery);
  snapshot.docs.map((doc) => product.push({ ...doc.data(), id: doc.id }));

  return product;
}

async function getNextData() {
  const next = query(
    collection(db, `product/ourWork/${activeTab.value}`),
    orderBy("timestamp"),
    startAfter(lastDoc.value),
    limit(8)
  );

  product.length = 0;
  const nextSnapshot = await getDocs(next);
  nextSnapshot.docs.map((doc) => product.push({ ...doc.data(), id: doc.id }));

  return product;
}

async function getPrevData() {
  const prevQuery = query(
    collection(db, `product/ourWork/${activeTab.value}`),
    orderBy("timestamp", "desc"),
    startAt(lastDoc.value),
    limit(8)
  );

  product.length = 0;
  const nextSnapshot = await getDocs(prevQuery);
  nextSnapshot.docs.map((doc) => product.push({ ...doc.data(), id: doc.id }));

  return product;
}

async function removeCard(id, path) {
  const documentRef = doc(db, `product/ourWork/${activeTab.value}`, id);
  const idx = product.findIndex((el) => el.id === id);
  product.splice(idx, 1);

  try {
    const storageReference = storageRef(storage, path);
    await deleteDoc(documentRef);
    await deleteObject(storageReference);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

async function updateDocumentById(date, documentId, url, newImg) {
  const storageReference = storageRef(storage, url);

  let newData = null;

  if (newImg !== null) {
    const snapshot = await uploadBytesResumable(storageReference, newImg);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    newData = {
      ...date,
      src: downloadUrl,
      timestamp: now,
    };
  } else {
    newData = {
      ...date,
      timestamp: now,
    };
  }

  try {
    const docRef = doc(db, `product/ourWork/${activeTab.value}`, documentId);
    await setDoc(docRef, newData);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 100px;
}

.pagination {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  &:hover {
    background: #000;
    color: white;
  }
}
.mr-20 {
  margin-right: 20px;
}
.admin__catalog {
  padding: 50px;
  display: flex;
}
.card__wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3 1fr);
  gap: 30px;
}
.mr-80 {
  margin-right: 80px;
}

@media screen and (max-width: 1199px) {
  .wrapper {
    padding: 50px;
  }

  .admin__catalog {
    flex-direction: column;
  }

  .mr-80 {
    margin: 0;
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 25px;
  }
  .admin__catalog {
    padding: 0;
  }
}
</style>
