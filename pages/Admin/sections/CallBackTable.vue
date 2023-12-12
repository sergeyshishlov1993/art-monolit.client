<template>
  <div class="wrapper">
    <div class="table">
      <div class="table__headers">
        <ui-text-h-3>ім'я</ui-text-h-3>
        <ui-text-h-3>номер</ui-text-h-3>
        <ui-text-h-3>дата</ui-text-h-3>
        <ui-text-h-3>статус</ui-text-h-3>
        <ui-text-h-3>виконано</ui-text-h-3>
      </div>

      <table-cell
        v-for="(persone, index) in feedbackData"
        :key="persone.id"
        :name="persone.name"
        :date="persone.date"
        :phone="persone.phone"
        :status="persone.status"
        :id="persone.id"
        :index="index"
        @remove="removePersone"
      />
    </div>

    <div class="pagination">
      <ui-btn class="mr-20 button" @click="getPrevData">ПОВЕРНУТИСЯ</ui-btn>
      <ui-btn class="button" @click="getNextData">ПОКАЗАТИ ЩЕ</ui-btn>
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount, ref } from "vue";
import { app } from "../firebaseConfig";

import {
  getFirestore,
  getDocs,
  collection,
  doc,
  deleteDoc,
  query,
  startAfter,
  limit,
  orderBy,
  startAt,
  onSnapshot,
} from "firebase/firestore";

import TableCell from "../components/TableCell.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";

const db = getFirestore(app);
const feedbackData = reactive([]);
const lastDoc = ref(null);

onBeforeMount(getFeedbackData);

async function getFeedbackData() {
  try {
    const feedbackCollection = query(
      collection(db, "feedback"),
      orderBy("timestamp"),
      limit(5)
    );
    const querySnapshot = await getDocs(feedbackCollection);

    lastDoc.value = querySnapshot.docs[querySnapshot.docs.length - 1];

    feedbackData.length = 0;
    querySnapshot.forEach((doc) =>
      feedbackData.push({ ...doc.data(), id: doc.id })
    );

    const unsubscribe = onSnapshot(feedbackCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const dataWithId = { ...change.doc.data(), id: change.doc.id };
        const index = feedbackData.findIndex(
          (item) => item.id === dataWithId.id
        );

        if (
          (change.type === "added" || change.type === "modified") &&
          index === -1
        ) {
          feedbackData.push(dataWithId);
        } else if (
          (change.type === "added" || change.type === "modified") &&
          index !== -1
        ) {
          feedbackData[index] = dataWithId;
        } else if (change.type === "removed" && index !== -1) {
          feedbackData.splice(index, 1);
        }
      });
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

async function removePersone(id, idx) {
  const documentRef = doc(db, "feedback", id);
  feedbackData.splice(idx, 1);

  try {
    await deleteDoc(documentRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}
async function getNextData() {
  const next = query(
    collection(db, `feedback`),
    orderBy("timestamp"),
    startAfter(lastDoc.value),
    limit(5)
  );

  feedbackData.length = 0;
  const nextSnapshot = await getDocs(next);
  nextSnapshot.docs.map((doc) =>
    feedbackData.push({ ...doc.data(), id: doc.id })
  );

  return feedbackData;
}

async function getPrevData() {
  const prevQuery = query(
    collection(db, "feedback"),
    orderBy("timestamp", "desc"),
    startAt(lastDoc.value),
    limit(5)
  );

  feedbackData.length = 0;
  const nextSnapshot = await getDocs(prevQuery);
  nextSnapshot.docs.map((doc) =>
    feedbackData.push({ ...doc.data(), id: doc.id })
  );

  return feedbackData;
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 100px 0 100px 0;
}
.table {
  display: flex;
  flex-direction: column;
  margin-top: 60px;

  &__headers {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid rgba(130, 100, 45, 1);
    h2 {
      width: 100px;
      font-weight: 500;
    }
  }
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
</style>
