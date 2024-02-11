import { defineStore } from "pinia";
import { reactive } from "vue";

import { app } from "../firebaseConfig";
import {
  getFirestore,
  doc,
  deleteDoc,
  setDoc,
  Timestamp,
  getDoc,
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
const zoomPathImg = reactive([null]);
const showSucsesMesage = reactive([]);

export const useCatalogData = defineStore("catalogData", () => {
  const product = reactive([]);
  const pagedData = reactive([]);
  const activeTab = reactive(["single"]);

  const changeTab = (tab) => {
    product.length = 0;
    return (activeTab[0] = tab);
  };

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
      const timestamp = new Date().getTime() + 12 * 60 * 60 * 1000;

      const dataWithTime = { documents: product, timestamp };

      localStorage.setItem(cacheKey, JSON.stringify(dataWithTime));

      getTotalPage(product);
      console.log("get firebase data");
    } catch (error) {
      console.error(error);
      console.log("error get firebase data");
    }
  }

  //get data cache || local storage || firebase

  async function getDataLocal(key) {
    return await new Promise((resolve) => {
      const data = localStorage.getItem(key);
      resolve(data);
    });
  }

  async function getData(adminTab, collectionName) {
    const cacheKey = `${collectionName}_${adminTab}_${activeTab[0]}`;
    const local = await getDataLocal(cacheKey);
    const localStorageData = await JSON.parse(local);
    try {
      const currentTimeInMillis = new Date().getTime();
      const expiresInCache = localStorageData?.timestamp;

      if (localStorageData?.documents && expiresInCache > currentTimeInMillis) {
        product.length = 0;
        product.push(...localStorageData.documents);
        console.log("local");

        getTotalPage(product);
      } else {
        await getFirebaseData(adminTab, collectionName);
        console.log("firebase");
      }
    } catch (error) {
      console.error("Error while getting data:", error);
    }
  }

  // ----------------------pagination------------------------------
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

  function getNextData() {
    if (totalPage != currentPage[0]) {
      getPageItems(currentPage[0] + 1);
    }
  }

  function getPrevData() {
    getPageItems(currentPage[0] - 1);
  }

  const currentProduct = reactive([]);
  async function getItemProduct(collectionName, id) {
    if (product.length !== 0) {
      const filteredProduct = product.filter((el) => el.id === id);
      currentProduct[0] = filteredProduct[0];
    } else {
      try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Документ найден
          product.length = 0;

          return (currentProduct[0] = { ...docSnap.data(), id: docSnap.id });
        } else {
          // Документ не найден
          console.log("Документ не найден");
          return null;
        }
      } catch (error) {
        console.error("Ошибка получения документа:", error);
        return null;
      }
    }
  }
  // ----------------------------------------

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
      showSucsesMesage[0] = "remove";

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        showSucsesMesage[0] = "";
      }, 1000);
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      localStorage.setItem(cacheKey, JSON.stringify(localStorageData));
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
      const key = `product/${adminTab}/${activeTab[0]}`;
      const docRef = doc(db, key, documentId);
      await setDoc(docRef, newData);

      await getFirebaseData(adminTab, "product");
      console.log("Document updated successfully");
      showSucsesMesage[0] = "change";

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        showSucsesMesage[0] = "";
      }, 1000);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  function getPathZoomImg(path) {
    zoomPathImg[0] = path;
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
    getFirebaseData,
    zoomPathImg,
    getPathZoomImg,
    showSucsesMesage,
    currentProduct,
  };
});
