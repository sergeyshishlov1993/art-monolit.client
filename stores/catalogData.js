import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import { app } from "../firebaseConfig";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  startAfter,
  limit,
  orderBy,
  endBefore,
  limitToLast,
} from "firebase/firestore";

const db = getFirestore(app);

const lastDoc = ref(null);
const firstDoc = ref(null);

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
      limit(6)
    );

    const documentSnapshots = await getDocs(firestoreQuery);

    lastDoc.value = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    firstDoc.value = documentSnapshots.docs[0];

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
      limit(6)
    );

    const nextSnapshot = await getDocs(next);

    if (nextSnapshot.docs.length > 0) {
      product.length = 0;
      nextSnapshot.docs.map((doc) =>
        product.push({ ...doc.data(), id: doc.id })
      );

      lastDoc.value = nextSnapshot.docs[nextSnapshot.docs.length - 1];
      firstDoc.value = nextSnapshot.docs[0];
    }

    return product;
  }

  async function getPrevData() {
    const prev = query(
      collection(db, `product/catalog/${activeTab[0]}`),
      orderBy("timestamp"),
      endBefore(firstDoc.value),
      limitToLast(6)
    );

    const prevSnapshot = await getDocs(prev);

    if (prevSnapshot.docs.length > 0) {
      product.length = 0;

      prevSnapshot.docs.map((doc) =>
        product.push({ ...doc.data(), id: doc.id })
      );

      lastDoc.value = prevSnapshot.docs[prevSnapshot.docs.length - 1];
      firstDoc.value = prevSnapshot.docs[0];
    }

    return product;
  }

  function getItemProduct(id) {
    if (product.length !== 0) {
      localStorage.setItem(
        "itemProduct",
        JSON.stringify(product.filter((el) => el.id === id))
      );
      return product.filter((el) => el.id === id);
    } else {
      const res = JSON.parse(localStorage.getItem("itemProduct"));
      product.push(res[0]);
    }

    return product;
  }

  return {
    activeTab,
    changeTab,
    product,
    getData,
    getNextData,
    getPrevData,
    getItemProduct,
  };
});
