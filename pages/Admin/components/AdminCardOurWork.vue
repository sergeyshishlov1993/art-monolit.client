<template>
  <div>
    <div v-if="showForm" class="wrapper__ourWork-admin">
      <form-our-work class="form" @form-data="updateFormData" />
      <icon-close @click="showForm = false" />
    </div>

    <div class="catalog__card" v-else>
      <div class="scelotor__wrapper">
        <img :src="props.src.stringValue" :alt="props.index" loading="lazy" />
      </div>

      <div class="btn__wrapper">
        <ui-btn class="btn primary" @click="showForm = true">змінити</ui-btn>
        <ui-btn class="btn danger" @click="removeCard(props.id, props.src)">
          видалити
        </ui-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormOurWork from "./FormOurWork.vue";
import UiBtn from "~/components/UI/UiBtn.vue";
import IconClose from "~/assets/icon/IconClose.vue";

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
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 6px 5px 8px 7px rgba(34, 60, 80, 0.2);
  border-radius: 20px;
  img {
    width: 100%;
    min-height: 350px;
    object-fit: cover;
    border-radius: 10px;
    z-index: 999;
  }
}

.wrapper__ourWork-admin {
  position: relative;

  svg {
    width: 20px;
    position: absolute;
    top: 0;
    right: 0;
  }
}

.scelotor__wrapper {
  position: relative;
  width: 100%;
}

.btn__wrapper {
  margin-top: 15px;
  display: flex;
  gap: 20px;
  button {
    width: 105px;
    padding: 10px;
    color: white;
  }
}
.primary {
  background: rgb(91, 145, 145);
  background: linear-gradient(
    90deg,
    rgba(91, 145, 145, 1) 0%,
    rgba(77, 163, 88, 1) 35%,
    rgba(63, 182, 114, 1) 62%,
    rgba(66, 245, 103, 1) 100%
  );
}
.danger {
  background: rgb(138, 110, 110);
  background: linear-gradient(
    90deg,
    rgba(138, 110, 110, 1) 0%,
    rgba(166, 79, 65, 1) 35%,
    rgba(170, 68, 68, 1) 62%,
    rgba(227, 60, 29, 1) 100%
  );
}
.form {
  width: 250px;
}
.mt-25 {
  margin-top: 25px;
}
@media screen and (max-width: 767px) {
  img {
    height: auto !important;
  }
}
</style>
