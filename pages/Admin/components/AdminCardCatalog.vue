<template>
  <div class="wrapper__catalog-admin">
    <admin-form-catalog
      v-if="showForm"
      class="form_card"
      :type="props.type.stringValue"
      :title="props.title.stringValue"
      :size="props.size.stringValue"
      :material="props.material.stringValue"
      :term="props.term.stringValue"
      :delivery="props.delivery.stringValue"
      :equipment="props.equipment.stringValue"
      :src="props.src.stringValue"
      :price="props.price.stringValue"
      @form-data="updateFormData"
    />

    <div class="catalog__card" v-else>
      <div class="scelotor__wrapper">
        <div class="sceletor" v-if="hidenSceletor"></div>
        <img
          :src="props.src.stringValue"
          :alt="props.title.stringValue"
          loading="lazy"
          @load="hidenSceletor = false"
        />
      </div>

      <div class="text__wrapper">
        <ui-text-h4 class="mt-25">{{ props.title.stringValue }}</ui-text-h4>
        <hr />
        <ui-text-h3 class="mt-25"
          >від <span>{{ props.price.stringValue }}</span> UAH</ui-text-h3
        >
      </div>

      <div class="btn__wrapper">
        <ui-btn class="btn primary" @click="showForm = true">змінити</ui-btn>
        <ui-btn
          class="btn danger"
          @click="removeCard(props.id, props.src.stringValue)"
        >
          видалити
        </ui-btn>
      </div>
    </div>
    <icon-close @click="showForm = false" v-if="showForm" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AdminFormCatalog from "./AdminFormCatalog.vue";
import UiBtn from "~/components/UI/UiBtn.vue";
import IconClose from "~/assets/icon/IconClose.vue";

const emit = defineEmits(["updateFormDate", "removeCard", "changes"]);
const props = defineProps({
  type: {
    type: Object,
    required: true,
  },
  title: {
    type: Object,
    required: true,
  },
  size: {
    type: Object,
    required: true,
  },
  material: {
    type: Object,
    required: true,
  },
  term: {
    type: Object,
    required: true,
  },
  delivery: {
    type: Object,
    required: true,
  },
  equipment: {
    type: Object,
    required: true,
  },
  src: {
    type: Object,
    required: true,
  },
  price: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const showForm = ref(false);
const hidenSceletor = ref(true);

function removeCard(id, path) {
  return emit("remove", id, path);
}

function updateFormData(data, file) {
  let formData = {};
  file
    ? (formData = {
        ...data,
      })
    : (formData = { ...data, src: props.src.stringValue });

  emit("updateFormData", formData, props.id, props.src.stringValue, file);
  showForm.value = false;
}
</script>

<style lang="scss" scoped>
.catalog__card {
  margin: 0 auto;
  padding: 20px;
  width: 300px;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 6px 5px 8px 7px rgba(34, 60, 80, 0.2);
  border-radius: 20px;
  img {
    width: 100%;
    max-height: 350px;
    min-height: 250px;
    border-radius: 10px;
  }
}

.wrapper__catalog-admin {
  position: relative;

  svg {
    width: 20px;
    position: absolute;
    top: 0;
    right: 0;
  }
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
.text__wrapper {
  width: 100%;
  h2 {
    text-align: center;
    span {
      color: darkred;
      font-weight: 500;
    }
  }
  hr {
    color: rgb(130, 100, 45);
    height: 2px;
  }
}
.form_card {
  width: 250px !important;
}
.scelotor__wrapper {
  width: 100%;
  position: relative;
}
.sceletor {
  width: 100%;
  max-height: 350px;
  min-height: 250px;
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

.mt-25 {
  margin-top: 25px;
}
@media screen and (max-width: 767px) {
  img {
    height: auto !important;
  }
}
</style>
