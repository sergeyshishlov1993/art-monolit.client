<template>
  <div class="wrapper">
    <ui-text-h1 class="white">ЗВЯЗАТИСЯ ЗІ МНОЮ</ui-text-h1>

    <form
      class="mt-150"
      @submit.prevent="sendFeedback"
      v-if="showModal == 'empty'"
    >
      <ui-input
        class="input"
        placeholder="Ваше ім’я"
        type="text"
        @focus="(event) => handleFocus(event, 'persone')"
        @input="(event) => getInputVal(event, 'persone')"
        @blur="(event) => handleBlur(event, 'persone')"
        :value="namePersone"
        :class="{
          invalid: errorsFormData?.persone?.errors.length != 0,
        }"
      />
      <ui-error
        v-for="error in errorsFormData?.persone?.errors ?? []"
        :key="error"
        :text="error"
      />

      <ui-input
        class="mt-45 input"
        placeholder="+380"
        type="text"
        required
        maxlength="13"
        @focus="(event) => handleFocus(event, 'phone')"
        @input="(event) => getInputVal(event, 'phone')"
        @blur="(event) => handleBlur(event, 'phone')"
        :value="phoneMask"
        :class="{
          invalid: errorsFormData?.phone?.errors.length != 0,
        }"
      />
      <ui-error
        v-for="error in errorsFormData?.phone?.errors ?? []"
        :key="error"
        :text="error"
      />

      <ui-btn class="mt-45 button">
        <ui-text-h3 class="fw-500 white">ПЕРЕДЗВОНИТЬ МЕНІ</ui-text-h3>
      </ui-btn>
    </form>
    <modal-done v-if="showModal == 'done'" />
    <modal-error v-if="showModal == 'error'" />
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { app } from "../firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref, computed } from "vue";
import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";

import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiBtn from "~/components/UI/UiBtn.vue";
import ModalDone from "~/components/Block/Modal/ModallDone.vue";
import ModalError from "~/components/Block/Modal/ModalError.vue";
import UiError from "~/components/UI/UiError.vue";

const db = getFirestore(app);
const namePersone = ref("");
const phone = ref("+380");
const date = new Date();
const dateFeedback = ref();
const showModal = ref("empty");

const phoneMask = computed(() => {
  const regex = /(\d?)(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/g;
  const subst = "$1 380 ($3)-$4-$5-$6";
  return phone.value.replace(regex, subst);
});

function handleFocus(event, name) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

function getInputVal(event, name) {
  switch (name) {
    case "persone":
      return (namePersone.value = event.target.value);

    case "phone":
      return (phone.value = event.target.value);
  }
}

function handleBlur(event, name) {
  switch (name) {
    case "persone":
      validateField((namePersone.value = event.target.value), name);
      break;

    case "phone":
      validateField((phone.value = event.target.value), name);
      break;
  }
}

function doValidateForm() {
  createErrorObj("persone");
  createErrorObj("phone");

  validateField(namePersone.value, "persone");
  validateField(phone.value, "phone");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

function getDateFeedback() {
  const dateOptipn = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return (dateFeedback.value = new Intl.DateTimeFormat("en-Uk", dateOptipn));
}

async function sendFeedback(event) {
  doValidateForm();

  if (!isFormValid()) {
    const form = event.target;
    try {
      const cardCollection = collection(db, "feedback");
      const documentId = uuidv4();

      await addDoc(
        cardCollection, //область в базе данных
        {
          name: namePersone.value,
          phone: phone.value,
          date: getDateFeedback().format(date),
          status: "в обробці",
        },
        documentId // id обьекта
      );

      namePersone.value = "";
      phone.value = "+380";
      form.reset();
      showModal.value = "done";

      setInterval(() => {
        showModal.value = "empty";
      }, 4000);
    } catch (error) {
      showModal.value = "error";

      setInterval(() => {
        showModal.value = "empty";
      }, 4000);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 150px 0;
  background: rgba(0, 0, 0, 1);
}

.white {
  text-align: center;
  color: white;
}

.button {
  width: 500px;
  height: 65px;
  background: #000;
  border: solid 2px white;
  &:hover {
    background: white;
    h2 {
      color: #000;
    }
  }
}

.input {
  width: 500px;
  height: 65px;
}

form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.mt-150 {
  margin-top: 150px;
}
.mt-45 {
  margin-top: 45px;
}
.fw-500 {
  font-weight: 500;
}

.invalid {
  animation: invalid 0.5s 2;

  @keyframes invalid {
    25% {
      // border: 2px solid darkred;
      box-shadow: 4px 4px 8px -3px darkred;
      translate: 6px 0;
    }
    50% {
      translate: -6px 0;
    }
    75% {
      translate: 6px 0;
    }
  }
}

@media screen and (max-width: 1023px) {
  .wrapper {
    padding: 100px 20px;
  }

  .button {
    max-width: 400px;
  }

  .input {
    max-width: 400px;
  }
}

@media screen and (max-width: 767px) {
  .button {
    max-width: 300px;
  }

  .input {
    max-width: 300px;
  }
}

@media screen and (max-width: 766px) {
  .wrapper {
    padding: 80px 10px;
  }
  .button {
    max-width: 270px;
  }

  .input {
    max-width: 270px;
  }
  .mt-150 {
    margin-top: 100px;
  }
}
</style>
