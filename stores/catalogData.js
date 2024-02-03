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
const zoomPathImg = reactive([null]);

export const useCatalogData = defineStore("catalogData", () => {
  const product = reactive([]);
  const pagedData = reactive([]);
  const filterPage = reactive([]);

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
      const timestamp = new Date().getTime() + 24 * 60 * 60;
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

  // async function getData(adminTab, collectionName) {
  //   try {
  //     const cacheKey = `${collectionName}_${adminTab}_${activeTab[0]}`;

  //     const localStorageData = JSON.parse(localStorage.getItem(cacheKey));
  //     const currentTimeInMillis = new Date().getTime();
  //     const expiresInCache = localStorageData?.timestamp;

  //     if (
  //       localStorageData?.documents &&
  //       (!expiresInCache || expiresInCache > currentTimeInMillis)
  //     ) {
  //       product.length = 0;
  //       product.push(...localStorageData.documents);
  //       console.log("local");

  //       getTotalPage(product);
  //     } else {
  //       await getFirebaseData(adminTab, collectionName);
  //       console.log("firebase");
  //     }
  //   } catch (error) {
  //     console.error("Error while getting data:", error);
  //   }
  // }

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

      if (
        localStorageData?.documents &&
        (!expiresInCache || expiresInCache > currentTimeInMillis)
      ) {
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

  // async function getData(adminTab, collectionName) {
  //   async function getDataLocal(key) {
  //     return await new Promise((resolve) => {
  //       const value = localStorage.getItem(key);
  //       resolve(value);
  //     });
  //   }
  //   const cacheKey = `${collectionName}_${adminTab}_${activeTab[0]}`;
  //   const local = await getDataLocal(cacheKey);
  //   try {
  //     const localStorageData = await JSON.parse(local);
  //     const currentTimeInMillis = new Date().getTime();
  //     const expiresInCache = localStorageData?.timestamp;

  //     if (
  //       localStorageData?.documents &&
  //       (!expiresInCache || expiresInCache > currentTimeInMillis)
  //     ) {
  //       product.length = 0;
  //       product.push(...localStorageData.documents);
  //       console.log("local");

  //       getTotalPage(product);
  //     } else {
  //       await getFirebaseData(adminTab, collectionName);
  //       console.log("firebase");
  //     }
  //   } catch (error) {
  //     console.error("Error while getting data:", error);
  //   }
  // }

  function getTotalPage(arr) {
    totalPage[0] = Math.ceil(arr.length / itemsPerPage);

    if (totalPage[0] <= 3) {
      filterPage.length = 0;
      for (let i = totalPage[0]; i > totalPage[0]; i++) {
        filterPage.length = 0;
        filterPage.push(i);
      }
    } else {
      filterPage.length = 0;
      filterPage.push(2, 3, 4);
    }

    return totalPage[0];
  }

  function getPageItems(pageNumber) {
    currentPage[0] = pageNumber;
    const startIndex = (currentPage[0] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    pagedData.length = 0;
    pagedData.push(...product.slice(startIndex, endIndex));

    if (currentPage[0] == 1 && filterPage.length > 2) {
      filterPage.length = 0;
      filterPage.push(2, 3, 4);
    }

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
    if (currentPage[0] > 4 && currentPage[0] != totalPage[0]) {
      filterPage.shift();
      filterPage.push(currentPage[0]);
    }
  }

  function getPrevData() {
    if (currentPage[0] !== 1) {
      getPageItems(currentPage[0] - 1);
    }

    if (currentPage[0] >= 4) {
      for (let i = 0; i < filterPage.length; i++) {
        filterPage[i] = filterPage[i] - 1;
      }
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
    localStorageData.documents = localStorageData.documents.filter(
      (el) => el.id !== id
    );

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
    filterPage,
    zoomPathImg,
    getPathZoomImg,
  };
});
