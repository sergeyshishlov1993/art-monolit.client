<template>
  <div class="wrapper">
    <div class="table">
      <div class="table__headers">
        <ui-text-h-3>ім'я</ui-text-h-3>
        <ui-text-h-3>номер</ui-text-h-3>
        <ui-text-h-3>дата</ui-text-h-3>
        <ui-text-h-3>статус</ui-text-h-3>
        <ui-text-h-3>pixel</ui-text-h-3>
        <ui-text-h-3>продукт</ui-text-h-3>
        <ui-text-h-3>виконано</ui-text-h-3>
      </div>

      <table-cell
        v-for="(persone, index) in feedbackData"
        :key="persone.id"
        :name="persone.name"
        :date="persone.date"
        :phone="persone.phone"
        :status="persone.status"
        :qwery="persone.qwery"
        :item="persone.item"
        :id="persone.id"
        :index="index"
        @remove="removePersone"
      />
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
  limitToLast,
  orderBy,
  endBefore,
  onSnapshot,
} from "firebase/firestore";

import TableCell from "../components/TableCell.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";

const db = getFirestore(app);
const feedbackData = reactive([]);
const lastDoc = ref(null);
const firstDoc = ref(null);

onBeforeMount(getFeedbackData);

const props = defineProps({
  adminTab: {
    type: String,
    requred: true,
  },
});

async function getFeedbackData() {
  try {
    const feedbackCollection = query(
      collection(db, "feedback"),
      orderBy("timestamp", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(feedbackCollection);

    lastDoc.value = querySnapshot.docs[querySnapshot.docs.length - 1];
    firstDoc.value = querySnapshot.docs[0];

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
    orderBy("timestamp", "desc"),
    startAfter(lastDoc.value),
    limit(5)
  );

  const nextSnapshot = await getDocs(next);

  if (nextSnapshot.docs.length > 0) {
    feedbackData.length = 0;
    nextSnapshot.docs.map((doc) =>
      feedbackData.push({ ...doc.data(), id: doc.id })
    );

    lastDoc.value = nextSnapshot.docs[nextSnapshot.docs.length - 1];
    firstDoc.value = nextSnapshot.docs[0];
  }

  return feedbackData;
}

async function getPrevData() {
  const prev = query(
    collection(db, "feedback"),
    orderBy("timestamp", "desc"),
    endBefore(firstDoc.value),
    limitToLast(5)
  );

  const prevSnapshot = await getDocs(prev);

  if (prevSnapshot.docs.length > 0) {
    feedbackData.length = 0;

    prevSnapshot.docs.forEach((doc) =>
      feedbackData.push({ ...doc.data(), id: doc.id })
    );

    lastDoc.value = prevSnapshot.docs[prevSnapshot.docs.length - 1];
    firstDoc.value = prevSnapshot.docs[0];
  }

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

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 30px;
  }
  .table__headers {
    display: none;
  }
}

@media screen and (max-width: 424px) {
  .wrapper {
    padding: 30px 0;
  }
}
</style>




<!--<template>-->
<!--  <div class="wrapper">-->
<!--    <div class="table">-->
<!--      <div class="table__scroll">-->
<!--        <div class="table__headers" role="row">-->
<!--          <ui-text-h-3 class="table__header">ім'я</ui-text-h-3>-->
<!--          <ui-text-h-3 class="table__header">номер</ui-text-h-3>-->
<!--          <ui-text-h-3 class="table__header">дата</ui-text-h-3>-->
<!--          <ui-text-h-3 class="table__header">статус</ui-text-h-3>-->
<!--          <ui-text-h-3 class="table__header">pixel</ui-text-h-3>-->
<!--          <ui-text-h-3 class="table__header">продукт</ui-text-h-3>-->
<!--          <ui-text-h-3 class="table__header">виконано</ui-text-h-3>-->
<!--        </div>-->

<!--        <div class="table__body" role="rowgroup">-->
<!--          <table-cell-->
<!--              v-for="(persone, index) in feedbackData"-->
<!--              :key="persone.id"-->
<!--              class="table__row"-->
<!--              :name="persone.name"-->
<!--              :date="persone.date"-->
<!--              :phone="persone.phone"-->
<!--              :status="persone.status"-->
<!--              :qwery="persone.qwery"-->
<!--              :item="persone.item"-->
<!--              :id="persone.id"-->
<!--              :index="index"-->
<!--              @remove="removePersone"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="pagination">-->
<!--      <ui-btn class="button button&#45;&#45;secondary" @click="getPrevData">-->
<!--        <ui-text-h3>ПОВЕРНУТИСЯ</ui-text-h3>-->
<!--      </ui-btn>-->

<!--      <ui-btn class="button" @click="getNextData">-->
<!--        <ui-text-h3>ПОКАЗАТИ ЩЕ</ui-text-h3>-->
<!--      </ui-btn>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { reactive, onBeforeMount, ref, onUnmounted } from "vue";-->
<!--import { app } from "../firebaseConfig";-->

<!--import {-->
<!--  getFirestore,-->
<!--  getDocs,-->
<!--  collection,-->
<!--  doc,-->
<!--  deleteDoc,-->
<!--  query,-->
<!--  startAfter,-->
<!--  limit,-->
<!--  limitToLast,-->
<!--  orderBy,-->
<!--  endBefore,-->
<!--  onSnapshot,-->
<!--  type DocumentData,-->
<!--  type QueryDocumentSnapshot,-->
<!--  type Unsubscribe,-->
<!--} from "firebase/firestore";-->

<!--import TableCell from "../components/TableCell.vue";-->
<!--import UiTextH3 from "~/components/UI/UiTextH3.vue";-->

<!--type FeedbackItem = {-->
<!--  id: string;-->
<!--  name?: string;-->
<!--  date?: string;-->
<!--  phone?: string;-->
<!--  status?: string;-->
<!--  qwery?: string;-->
<!--  item?: string;-->
<!--  timestamp?: unknown;-->
<!--};-->

<!--const db = getFirestore(app);-->
<!--const feedbackData = reactive<FeedbackItem[]>([]);-->
<!--const lastDoc = ref<QueryDocumentSnapshot<DocumentData> | null>(null);-->
<!--const firstDoc = ref<QueryDocumentSnapshot<DocumentData> | null>(null);-->
<!--const unsubscribeRef = ref<Unsubscribe | null>(null);-->

<!--onBeforeMount(getFeedbackData);-->

<!--const props = defineProps<{-->
<!--  adminTab: string;-->
<!--}>();-->

<!--onUnmounted((): void => {-->
<!--  if (unsubscribeRef.value) unsubscribeRef.value();-->
<!--});-->

<!--async function getFeedbackData(): Promise<Unsubscribe | void> {-->
<!--  try {-->
<!--    const feedbackCollection = query(-->
<!--        collection(db, "feedback"),-->
<!--        orderBy("timestamp", "desc"),-->
<!--        limit(5)-->
<!--    );-->

<!--    const querySnapshot = await getDocs(feedbackCollection);-->

<!--    lastDoc.value = querySnapshot.docs[querySnapshot.docs.length - 1] ?? null;-->
<!--    firstDoc.value = querySnapshot.docs[0] ?? null;-->

<!--    feedbackData.length = 0;-->
<!--    querySnapshot.forEach((documentItem) => {-->
<!--      feedbackData.push({ ...(documentItem.data() as Record<string, unknown>), id: documentItem.id } as FeedbackItem);-->
<!--    });-->

<!--    if (unsubscribeRef.value) unsubscribeRef.value();-->

<!--    const unsubscribe = onSnapshot(feedbackCollection, (snapshot) => {-->
<!--      snapshot.docChanges().forEach((change) => {-->
<!--        const dataWithId = {-->
<!--          ...(change.doc.data() as Record<string, unknown>),-->
<!--          id: change.doc.id,-->
<!--        } as FeedbackItem;-->

<!--        const index = feedbackData.findIndex((item) => item.id === dataWithId.id);-->

<!--        if ((change.type === "added" || change.type === "modified") && index === -1) {-->
<!--          feedbackData.push(dataWithId);-->
<!--        } else if ((change.type === "added" || change.type === "modified") && index !== -1) {-->
<!--          feedbackData[index] = dataWithId;-->
<!--        } else if (change.type === "removed" && index !== -1) {-->
<!--          feedbackData.splice(index, 1);-->
<!--        }-->
<!--      });-->
<!--    });-->

<!--    unsubscribeRef.value = unsubscribe;-->
<!--    return unsubscribe;-->
<!--  } catch (error) {-->
<!--    console.error("Error loading data:", error);-->
<!--  }-->
<!--}-->

<!--async function removePersone(id: string, idx: number): Promise<void> {-->
<!--  const documentRef = doc(db, "feedback", id);-->
<!--  feedbackData.splice(idx, 1);-->

<!--  try {-->
<!--    await deleteDoc(documentRef);-->
<!--    console.log("Document deleted successfully");-->
<!--  } catch (error) {-->
<!--    console.error("Error deleting document:", error);-->
<!--  }-->
<!--}-->

<!--async function getNextData(): Promise<FeedbackItem[]> {-->
<!--  if (!lastDoc.value) return feedbackData;-->

<!--  const next = query(-->
<!--      collection(db, `feedback`),-->
<!--      orderBy("timestamp", "desc"),-->
<!--      startAfter(lastDoc.value),-->
<!--      limit(5)-->
<!--  );-->

<!--  const nextSnapshot = await getDocs(next);-->

<!--  if (nextSnapshot.docs.length > 0) {-->
<!--    feedbackData.length = 0;-->

<!--    nextSnapshot.docs.forEach((documentItem) => {-->
<!--      feedbackData.push({ ...(documentItem.data() as Record<string, unknown>), id: documentItem.id } as FeedbackItem);-->
<!--    });-->

<!--    lastDoc.value = nextSnapshot.docs[nextSnapshot.docs.length - 1] ?? null;-->
<!--    firstDoc.value = nextSnapshot.docs[0] ?? null;-->
<!--  }-->

<!--  return feedbackData;-->
<!--}-->

<!--async function getPrevData(): Promise<FeedbackItem[]> {-->
<!--  if (!firstDoc.value) return feedbackData;-->

<!--  const prev = query(-->
<!--      collection(db, "feedback"),-->
<!--      orderBy("timestamp", "desc"),-->
<!--      endBefore(firstDoc.value),-->
<!--      limitToLast(5)-->
<!--  );-->

<!--  const prevSnapshot = await getDocs(prev);-->

<!--  if (prevSnapshot.docs.length > 0) {-->
<!--    feedbackData.length = 0;-->

<!--    prevSnapshot.docs.forEach((documentItem) => {-->
<!--      feedbackData.push({ ...(documentItem.data() as Record<string, unknown>), id: documentItem.id } as FeedbackItem);-->
<!--    });-->

<!--    lastDoc.value = prevSnapshot.docs[prevSnapshot.docs.length - 1] ?? null;-->
<!--    firstDoc.value = prevSnapshot.docs[0] ?? null;-->
<!--  }-->

<!--  return feedbackData;-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.wrapper {-->
<!--  padding: 48px 0 64px;-->
<!--}-->

<!--.table {-->
<!--  margin-top: 24px;-->
<!--  border: 1px solid rgba(130, 100, 45, 0.35);-->
<!--  border-radius: 14px;-->
<!--  background: rgba(255, 255, 255, 0.65);-->
<!--  backdrop-filter: blur(10px);-->
<!--  overflow: hidden;-->

<!--  &__scroll {-->
<!--    overflow-x: auto;-->
<!--    -webkit-overflow-scrolling: touch;-->
<!--  }-->

<!--  &__headers {-->
<!--    display: grid;-->
<!--    grid-template-columns: 1.4fr 1.1fr 1fr 1fr 0.8fr 1.2fr 0.9fr;-->
<!--    gap: 12px;-->
<!--    align-items: center;-->
<!--    padding: 16px 18px;-->
<!--    border-bottom: 1px solid rgba(130, 100, 45, 0.35);-->
<!--    background: rgba(130, 100, 45, 0.06);-->
<!--    min-width: 980px;-->
<!--  }-->

<!--  &__header {-->
<!--    width: 100%;-->
<!--    font-weight: 600;-->
<!--    opacity: 0.9;-->
<!--  }-->

<!--  &__body {-->
<!--    min-width: 980px;-->
<!--  }-->
<!--}-->

<!--.table :deep(.table__row) {-->
<!--  display: grid;-->
<!--  grid-template-columns: 1.4fr 1.1fr 1fr 1fr 0.8fr 1.2fr 0.9fr;-->
<!--  gap: 12px;-->
<!--  align-items: center;-->
<!--  padding: 14px 18px;-->
<!--  border-bottom: 1px solid rgba(130, 100, 45, 0.22);-->
<!--}-->

<!--.table :deep(.table__row:last-child) {-->
<!--  border-bottom: 0;-->
<!--}-->

<!--.table :deep(.table__row:hover) {-->
<!--  background: rgba(130, 100, 45, 0.06);-->
<!--}-->

<!--.pagination {-->
<!--  margin-top: 22px;-->
<!--  display: flex;-->
<!--  gap: 12px;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  flex-wrap: wrap;-->
<!--}-->

<!--.button {-->
<!--  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;-->
<!--  border-radius: 12px;-->

<!--  &:hover {-->
<!--    background: #000;-->
<!--    color: #fff;-->
<!--    transform: translateY(-1px);-->
<!--  }-->

<!--  &:active {-->
<!--    transform: translateY(0);-->
<!--  }-->

<!--  &&#45;&#45;secondary:hover {-->
<!--    background: rgba(0, 0, 0, 0.9);-->
<!--    color: #fff;-->
<!--  }-->
<!--}-->

<!--@media screen and (max-width: 767px) {-->
<!--  .wrapper {-->
<!--    padding: 24px 12px 40px;-->
<!--  }-->

<!--  .table {-->
<!--    border-radius: 16px;-->

<!--    &__headers {-->
<!--      position: sticky;-->
<!--      top: 0;-->
<!--      z-index: 1;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--@media screen and (max-width: 424px) {-->
<!--  .wrapper {-->
<!--    padding: 20px 10px 36px;-->
<!--  }-->
<!--}-->
<!--</style>-->
