<template>
  <form method="POST" @submit.prevent="handleFormSubmit">
    <select
      class="mb-10"
      @focus="(event) => handleFocus(event, 'type')"
      @input="(event) => handleInputChange(event, 'type')"
      @blur="(event) => handleBlur(event, 'type')"
    >
      <option value="">
        <ui-text-h4>Оберіть тип</ui-text-h4>
      </option>
      <option value="single">Одиночны</option>
      <option value="double">Двійні</option>
      <option value="memorial">Меморіальні Комплекси</option>
      <option value="kids">Дитячі</option>
      <option value="accessories">Аксесуари</option>
    </select>

    <ui-error
      v-for="error in errorsFormData?.type?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="file"
      placeholder="комплектація"
      type="file"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'file')"
      @change="handleFileChange"
      @blur="(event) => handleBlur(event, 'file')"
    />

    <ui-error
      v-for="error in errorsFormData?.file?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-btn>ЗАВАНТАЖИТИ</ui-btn>
  </form>
</template>

<script setup>
import { ref } from "vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiBtn from "~/components/UI/UiBtn.vue";
const emit = defineEmits(["formData"]);
const props = defineProps({
  type: {
    type: String,
  },
});

const type = ref("" || props.type);
const file = ref(null);

function handleFocus(event, name) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

const handleInputChange = (event, name) => {
  switch (name) {
    case "type":
      return (type.value = event.target.value);
  }
};

const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

function handleBlur(event, name) {
  switch (name) {
    case "type":
      validateField((type.value = event.target.value), name);
      break;

    case "file":
      validateField((file.value = event.target.files[0]), name);
      break;

    case "numberOfCatalog":
      validateField((numberOfCatalog.value = event.target.value), name);
      break;
  }
}

function doValidateForm() {
  createErrorObj("type");
  createErrorObj("file");

  validateField(type.value, "type");
  validateField(file.value, "file");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

const handleFormSubmit = (event) => {
  doValidateForm();
  const form = event.target;

  if (!isFormValid()) {
    emit(
      "formData",
      {
        type: type.value,
      },
      file.value,
      type.value
    );

    type.value = "";
    form.reset();
  }
};
</script>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 500px;
}
select {
  padding: 12px 0 12px 24px;
  background: white;
  border-radius: 20px;
  border: 1px solid black;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.mb-10 {
  margin-bottom: 10px;
}
</style>
