import { defineStore } from "pinia";
import { reactive } from "vue";

import { app } from "../firebaseConfig";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  startAfter,
  limit,
  orderBy,
  startAt,
} from "firebase/firestore";

const db = getFirestore(app);

const lastDoc = ref(null);

export const useCatalogData = defineStore("catalogData", () => {
  const product = reactive([]);

  const activeTab = reactive(["single"]);

  const changeTab = (tab) => {
    return (activeTab[0] = tab);
  };

  async function getData() {
    const firestoreQuery = query(
      collection(db, `product/catalog/${activeTab[0]}`),
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
      collection(db, `product/catalog/${activeTab[0]}`),
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
      collection(db, `product/catalog/${activeTab[0]}`),
      orderBy("timestamp", "desc"),
      startAt(lastDoc.value),
      limit(8)
    );

    product.length = 0;
    const nextSnapshot = await getDocs(prevQuery);
    nextSnapshot.docs.map((doc) => product.push({ ...doc.data(), id: doc.id }));

    return product;
  }

  return {
    activeTab,
    changeTab,
    product,
    getData,
    getNextData,
    getPrevData,
  };
});
