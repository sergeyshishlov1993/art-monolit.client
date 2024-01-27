import { defineStore } from "pinia";
import { reactive } from "vue";

import { app } from "../firebaseConfig";
import {
  getFirestore,
  doc,
  deleteDoc,
  setDoc,
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

const totalPage = reactive([1]);
const currentPage = reactive([1]);
const itemsPerPage = 6;

export const useCatalogData = defineStore("catalogData", () => {
  const product = reactive([]);
  const pagedData = reactive([]);

  const activeTab = reactive(["single"]);

  const changeTab = (tab) => {
    return (activeTab[0] = tab);
  };

  const nuxtApp = useNuxtApp();

  async function getFirebaseData(adminTab, collectionName) {
    const cacheKey = `${collectionName}_${adminTab}_${activeTab[0]}`;
    try {
      const { data } = await useFetch(
        `https://firestore.googleapis.com/v1/projects/art-monolit-8898c/databases/(default)/documents/${collectionName}/${adminTab}/${activeTab[0]}?pageSize=300
      `,
        {
          key: cacheKey,
        }
      );

      product.length = 0;

      data.value.documents.map((doc) => {
        const id = doc.name.split("/").pop();
        product.push({ ...doc.fields, id: id });
      });

      //actual time cache localStorage
      const currentTime = new Date().getTime();
      const dataWithTime = { documents: product, currentTime };

      localStorage.setItem(cacheKey, JSON.stringify(dataWithTime));

      getTotalPage(product);
    } catch (error) {
      console.log("error get firebase data");
    }
  }

  //get data cache || local storage || firebase

  async function getData(adminTab, collectionName) {
    try {
      const cacheKey = `${collectionName}_${adminTab}_${activeTab[0]}`;
      const localStorageData = JSON.parse(localStorage.getItem(cacheKey));

      product.length = 0;
      const data =
        nuxtApp.payload.data[cacheKey] || nuxtApp.static.data[cacheKey];

      console.log("Debug: data", data);
      console.log("Debug: localStorageData", localStorageData);

      if (data && data.value && data.value.documents) {
        // Используем данные из data
        data.value.documents.map((doc) => {
          product.push({ ...doc });
        });

        console.log("cache");
      } else if (localStorageData && localStorageData.documents) {
        // Используем данные из localStorageData
        localStorageData.documents.map((doc) => {
          product.push({ ...doc });
        });

        console.log("local");
      } else {
        await getFirebaseData(adminTab, collectionName);
        console.log("firebase");
      }

      getTotalPage(product);

      // Проверка на валидность кеша в локальном хранилище
      const secondsInDay = 24 * 60 * 60;
      const expiresInCache = JSON.parse(localStorage.getItem(cacheKey));
      const currentTimeInMillis = new Date().getTime();

      if (expiresInCache?.currentTime + secondsInDay < currentTimeInMillis) {
        await getFirebaseData(adminTab, collectionName);
      }
    } catch (error) {
      console.error("Error while getting data:", error);
    }
  }

  function getTotalPage(arr) {
    totalPage[0] = Math.ceil(arr.length / itemsPerPage);
    return totalPage[0];
  }

  function getPageItems(pageNumber) {
    currentPage[0] = pageNumber;
    const startIndex = (currentPage[0] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    pagedData.length = 0;
    pagedData.push(...product.slice(startIndex, endIndex));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return pagedData;
  }

  async function getNextData() {
    if (totalPage != currentPage[0]) {
      getPageItems(currentPage[0] + 1);
    }
  }

  async function getPrevData() {
    if (currentPage[0] !== 1) {
      getPageItems(currentPage[0] - 1);
    }
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

  async function removeCard(id, path, adminTab) {
    const cacheKey = `product_${adminTab}_${activeTab[0]}`;
    const localStorageData = JSON.parse(localStorage.getItem(cacheKey));
    const documentRef = doc(db, `product/${adminTab}/${activeTab[0]}`, id);
    const idx = pagedData.findIndex((el) => el.id === id);
    pagedData.splice(idx, 1);
    localStorageData.documents.splice(idx, 1);

    try {
      const storageReference = storageRef(storage, path);
      await deleteDoc(documentRef);
      await deleteObject(storageReference);
      console.log("Document deleted successfully");
      localStorage.setItem(cacheKey, JSON.stringify(localStorageData));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  async function updateDocumentById(date, documentId, url, newImg, adminTab) {
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
      const docRef = doc(db, `product/${adminTab}/${activeTab[0]}`, documentId);
      await setDoc(docRef, newData);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  return {
    activeTab,
    changeTab,
    product,
    getData,
    getNextData,
    getPrevData,
    getItemProduct,
    updateDocumentById,
    removeCard,
    totalPage,
    getPageItems,
    pagedData,
    currentPage,
  };
});
