<template>
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
</template>

<script setup>
import { reactive, onBeforeMount, ref } from "vue";
import { app } from "../firebaseConfig";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  doc,
  deleteDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

import TableCell from "../components/TableCell.vue";
import UiTextH2 from "~/components/UI/UiTextH3.vue";

const db = getFirestore(app);
const feedbackData = reactive([]);

onBeforeMount(getFeedbackData);

async function getFeedbackData() {
  try {
    const feedbackCollection = collection(db, "feedback");
    const querySnapshot = await getDocs(feedbackCollection);

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
</script>

<style lang="scss" scoped>
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
</style>
