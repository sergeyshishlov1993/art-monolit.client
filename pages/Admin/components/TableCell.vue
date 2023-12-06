<template>
  <div class="cell" :class="{ isDone: isDone || props.status === 'виконанно' }">
    <ui-text-h4>{{ props.name }}</ui-text-h4>

    <a :href="'tel:' + props.phone">
      <ui-text-h4>{{ props.phone }}</ui-text-h4>
    </a>
    <ui-text-h4>{{ props.date }}</ui-text-h4>

    <ui-text-h4
      :class="{ red: isDone || props.status === 'виконанно' }"
      v-if="!isDone || props.status === 'виконанно'"
      >{{ props.status }}</ui-text-h4
    >
    <ui-text-h4 v-else :class="{ red: isDone || props.status === 'виконанно' }"
      >виконанно</ui-text-h4
    >

    <button
      class="btn btn-danger"
      v-if="isDone || props.status === 'виконанно'"
      @click="removePersone"
    >
      видалити
    </button>
    <button class="btn btn-primary" @click="updatePersonStatus" v-else>
      завершити
    </button>
  </div>
</template>

<script setup>
import { app } from "../firebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
const props = defineProps({
  name: {
    type: String,
    requred: true,
  },
  phone: {
    type: String,
    requred: true,
  },
  date: {
    type: String,
    requred: true,
  },
  status: {
    type: String,
    requred: true,
  },
  id: {
    type: String,
    requred: true,
  },
  index: {
    type: Number,
    requred: true,
  },
});

const emit = defineEmits(["remove"]);

const db = getFirestore(app);
const isDone = ref(false);

async function updatePersonStatus() {
  isDone.value = true;
  const updateData = {
    status: "виконанно",
  };

  try {
    const docRef = doc(db, "feedback", props.id);
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

function removePersone() {
  emit("remove", props.id, props.index);
}
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.1);
  padding: 30px 15px 30px 30px;
  border-bottom: 2px solid rgba(130, 100, 45, 1);
  h2 {
    width: 170px;
    background: none;
  }
}
.isDone {
  background: none;
}
.red {
  color: darkred;
  font-weight: 500;
}
.btn {
  width: 125px;
}
</style>
