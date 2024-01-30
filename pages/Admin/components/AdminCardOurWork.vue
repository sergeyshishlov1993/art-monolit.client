<template>
  <div>
    <form-our-work class="form" v-if="showForm" @form-data="updateFormData" />

    <div class="catalog__card" v-else>
      <div class="scelotor__wrapper">
        <img
          :src="props.src.stringValue"
          :alt="props.index"
          loading="lazy"
          @load="hidenSceletor = false"
        />
        <div class="sceletor" v-if="hidenSceletor"></div>
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
import FormOurWork from "./FormOurWork.vue";

const emit = defineEmits(["updateFormDate", "removeCard", "changes"]);
const props = defineProps({
  type: {
    type: Object,
    required: false,
  },

  src: {
    type: Object,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },

  index: {
    type: Number,
    required: false,
  },
});

const showForm = ref(false);
const hidenSceletor = ref(true);

function removeCard(id, path) {
  return emit("remove", id, path.stringValue);
}

function updateFormData(data, file) {
  let formData = {};
  file
    ? (formData = {
        ...data,
      })
    : (formData = { ...data, src: props.src });

  emit("updateFormData", formData, props.id, props.src.stringValue, file);
  showForm.value = false;
}
</script>

<style lang="scss" scoped>
.catalog__card {
  margin: 0 auto;
  position: relative;
  padding: 20px;
  width: 300px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 6px 5px 8px 7px rgba(34, 60, 80, 0.2);
  border-radius: 20px;
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 10px;
    z-index: 999;
  }
}

.white {
  color: white;
}
.scelotor__wrapper {
  position: relative;
  width: 100%;
}
.sceletor {
  width: 100%;
  height: 350px;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  animation: loading 1.5s infinite;
  z-index: 1;
}

@keyframes loading {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
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
@media screen and (max-width: 767px) {
  img {
    height: auto;
  }
}
</style>
