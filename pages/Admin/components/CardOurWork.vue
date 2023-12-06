<template>
  <div>
    <form-our-work class="form" v-if="showForm" @form-data="updateFormData" />

    <div class="catalog__card" v-else>
      <img :src="props.src" :alt="props.index" />

      <div class="number">
        <ui-text-h1 class="white">{{ props.index + 1 }}</ui-text-h1>
      </div>
      <div class="btn__wrapper">
        <button class="btn btn-primary" @click="showForm = true">
          змінити
        </button>
        <button class="btn btn-danger" @click="removeCard(props.id, props.src)">
          видалити
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormOurWork from "../components/FormOurWork.vue";

const emit = defineEmits(["updateFormDate", "removeCard", "changes"]);
const props = defineProps({
  type: {
    type: String,
    required: true,
  },

  src: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },

  index: {
    type: Number,
    required: true,
  },
});

const showForm = ref(false);

function removeCard(id, path) {
  return emit("remove", id, path);
}

function updateFormData(data, file) {
  let formData = {};
  file
    ? (formData = {
        ...data,
      })
    : (formData = { ...data, src: props.src });

  emit("updateFormData", formData, props.id, props.src, file);
  showForm.value = false;
}
</script>

<style lang="scss" scoped>
.catalog__card {
  position: relative;
  padding: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 20px;
}
.number {
  position: absolute;
  bottom: 80px;
  left: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #000;
  border-radius: 100%;
  width: 40px;
}
.white {
  color: white;
}
.btn__wrapper {
  margin-top: 15px;
  button {
    border-radius: 15px;
    margin-right: 10px;
  }
}
.form {
  width: 250px;
}
.mt-25 {
  margin-top: 25px;
}
</style>
