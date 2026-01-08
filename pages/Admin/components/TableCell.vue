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
    >
      {{ props.status }}
    </ui-text-h4>
    <ui-text-h4 v-else :class="{ red: isDone || props.status === 'виконанно' }">
      виконанно
    </ui-text-h4>

    <ui-text-h4 class="new-item">{{ props.qwery }}</ui-text-h4>

    <ui-text-h4 class="new-item">
      <a v-if="props.item" :href="props.item" target="_blank" rel="noopener noreferrer">
        Переглянути
      </a>
      <span v-else class="placeholder">—</span>
    </ui-text-h4>

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

<script setup lang="ts">
import { app } from "../firebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";

const props = defineProps<{
  name: string;
  phone: string;
  date: string;
  status: string;
  id: string;
  qwery?: string;
  item?: string;
  index: number;
}>();

const emit = defineEmits<{
  (event: "remove", id: string, index: number): void;
}>();

const db = getFirestore(app);
const isDone = ref<boolean>(false);

async function updatePersonStatus(): Promise<void> {
  isDone.value = true;

  try {
    const docRef = doc(db, "feedback", props.id);
    await updateDoc(docRef, { status: "виконанно" });
  } catch (error) {
    console.error(error);
  }
}

function removePersone(): void {
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

.placeholder {
  opacity: 0.6;
}

@media screen and (max-width: 1023px) {
  .cell {
    h2 {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 767px) {
  .cell {
    padding: 30px;
    flex-direction: column;

    h2 {
      text-align: center;
      margin-bottom: 10px;
      font-size: 16px;
    }

    button {
      align-self: center;
    }
  }

  .new-item {
    margin-top: 10px;
  }
}
</style>
