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
      <option :value="'single'">Одиночні</option>
      <option :value="'double'">Двійні</option>
      <option :value="'memorial'">Меморіальні Комплекси</option>
      <option :value="'kids'.type">Дитячі</option>
      <option :value="'accessories'">Аксесуари</option>
      <option :value="'cross'">Хрести</option>
    </select>

    <ui-error
      v-for="error in errorsFormData?.type?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="title"
      type="text"
      placeholder="назва"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'title')"
      @input="(event) => handleInputChange(event, 'title')"
      @blur="(event) => handleBlur(event, 'title')"
      :value="title"
    />
    <ui-error
      v-for="error in errorsFormData?.title?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="size"
      type="text"
      placeholder="розмір"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'size')"
      @input="(event) => handleInputChange(event, 'size')"
      @blur="(event) => handleBlur(event, 'size')"
      :value="size"
    />
    <ui-error
      v-for="error in errorsFormData?.size?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="material"
      type="text"
      placeholder="матеріал"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'material')"
      @input="(event) => handleInputChange(event, 'material')"
      @blur="(event) => handleBlur(event, 'material')"
      :value="material"
    />
    <ui-error
      v-for="error in errorsFormData?.material?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="term"
      type="number"
      placeholder="термін виготовлення"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'term')"
      @input="(event) => handleInputChange(event, 'term')"
      @blur="(event) => handleBlur(event, 'term')"
      :value="term"
    />
    <ui-error
      v-for="error in errorsFormData?.term?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="delivery"
      type="text"
      placeholder="доставка"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'delivery')"
      @input="(event) => handleInputChange(event, 'delivery')"
      @blur="(event) => handleBlur(event, 'delivery')"
      :value="delivery"
    />
    <ui-error
      v-for="error in errorsFormData?.delivery?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="equipment"
      type="text"
      placeholder="комплектація"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'equipment')"
      @input="(event) => handleInputChange(event, 'equipment')"
      @blur="(event) => handleBlur(event, 'equipment')"
      :value="equipment"
    />
    <ui-error
      v-for="error in errorsFormData?.equipment?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="file"
      type="file"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'file')"
      @change="handleFileChange"
      @blur="(event) => handleBlur(event, 'file')"
    />
    <img :src="props.src" :alt="props.title" v-if="props.src" />
    <ui-error
      v-for="error in errorsFormData?.file?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      name="price"
      type="number"
      placeholder="ціна"
      class="mb-10"
      @focus="(event) => handleFocus(event, 'price')"
      @input="(event) => handleInputChange(event, 'price')"
      @blur="(event) => handleBlur(event, 'price')"
      :value="price"
    />
    <ui-error
      v-for="error in errorsFormData?.price?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-btn>ЗАВАНТАЖИТИ</ui-btn>
  </form>
</template>

<script setup>
import { ref } from "vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiError from "~/components/UI/UiError.vue";
import UiBtn from "~/components/UI/UiBtn.vue";

import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";

const props = defineProps({
  type: {
    type: String,
  },
  title: {
    type: String,
  },
  size: {
    type: String,
  },
  material: {
    type: String,
  },
  term: {
    type: String,
  },
  delivery: {
    type: String,
  },
  equipment: {
    type: String,
  },
  src: {
    type: String,
  },
  price: {
    type: String,
  },
});
const emit = defineEmits(["formData"]);

const type = ref("" || props.type);
const title = ref("" || props.title);
const size = ref("" || props.size);
const material = ref("" || props.material);
const term = ref("" || props.term);
const delivery = ref("" || props.delivery);
const equipment = ref("" || props.equipment);
const price = ref("" || props.price);
const file = ref(null);
const showSpiner = ref(false);

function handleFocus(event, name) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

const handleInputChange = (event, name) => {
  switch (name) {
    case "type":
      return (type.value = event.target.value);

    case "title":
      return (title.value = event.target.value.toUpperCase());

    case "size":
      return (size.value = event.target.value.toUpperCase());

    case "material":
      return (material.value = event.target.value.toUpperCase());

    case "term":
      return (term.value = event.target.value);

    case "delivery":
      return (delivery.value = event.target.value.toUpperCase());

    case "equipment":
      return (equipment.value = event.target.value.toUpperCase());

    case "price":
      return (price.value = event.target.value);
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

    case "title":
      validateField((title.value = event.target.value), name);
      break;

    case "size":
      validateField((size.value = event.target.value), name);
      break;

    case "material":
      validateField((material.value = event.target.value), name);
      break;

    case "term":
      validateField((term.value = event.target.value), name);
      break;

    case "delivery":
      validateField((delivery.value = event.target.value), name);
      break;

    case "equipment":
      validateField((equipment.value = event.target.value), name);
      break;

    case "price":
      validateField((price.value = event.target.value), name);
      break;
  }
}

function doValidateForm() {
  createErrorObj("type");
  createErrorObj("title");
  createErrorObj("size");
  createErrorObj("material");
  createErrorObj("term");
  createErrorObj("delivery");
  createErrorObj("equipment");
  createErrorObj("file");
  createErrorObj("price");

  validateField(type.value, "type");
  validateField(title.value, "title");
  validateField(size.value, "size");
  validateField(material.value, "material");
  validateField(term.value, "term");
  validateField(delivery.value, "delivery");
  validateField(equipment.value, "equipment");
  validateField(price.value, "price");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

const handleFormSubmit = (event) => {
  const form = event.target;
  doValidateForm();

  if (!isFormValid()) {
    showSpiner.value = true;
    emit(
      "formData",
      {
        type: type.value,
        title: title.value,
        size: size.value,
        material: material.value,
        term: term.value,
        delivery: delivery.value,
        equipment: equipment.value,
        price: price.value,
      },
      file.value,
      type.value,
      showSpiner.value
    );

    type.value = "";
    title.value = "";
    size.value = "";
    material.value = "";
    term.value = "";
    delivery.value = "";
    equipment.value = "";
    price.value;
    form.reset();
  }
};
</script>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 500px;
}
select {
  padding: 12px 0 12px 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 4px 9px 15px 1px rgba(34, 60, 80, 0.35);
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.mb-10 {
  margin-bottom: 10px;
}
</style>
