<template>
  <div>
    <form-category
      class="form_card"
      v-if="showForm"
      :type="props.type"
      :title="props.title"
      :size="props.size"
      :material="props.material"
      :term="props.term"
      :delivery="props.delivery"
      :equipment="props.equipment"
      :src="props.src"
      :price="props.price"
      @form-data="updateFormData"
    />

    <div class="catalog__card" v-else>
      <img :src="props.src" :alt="props.title" />
      <div>
        <ui-text-h4 class="mt-25">{{ props.title }}</ui-text-h4>
        <ui-text-h3 class="mt-25">{{ props.price }}</ui-text-h3>
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
import FormCategory from "../components/FormCategory.vue";

const emit = defineEmits(["updateFormDate", "removeCard", "changes"]);
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  delivery: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  id: {
    type: String,
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
  padding: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 20px;
}
.btn__wrapper {
  margin-top: 15px;
  button {
    border-radius: 15px;
    margin-right: 10px;
  }
}
.form_card {
  width: 250px !important;
}

.mt-25 {
  margin-top: 25px;
}
</style>
