<template>
  <div class="modal">
    <icon-close class="close" @click="closeModal" />

    <div v-if="showModal == 'empty'" class="wrapper">
      <ui-text-h1 class="center">ДІЗНАТИСЯ ВАРТІСТЬ</ui-text-h1>

      <form @submit.prevent="sendFeedback">
        <ui-input
          class="input"
          placeholder="Ваше ім’я"
          type="text"
          @focus="(event) => handleFocus(event, 'persone')"
          @input="(event) => getInputVal(event, 'persone')"
          @blur="(event) => handleBlur(event, 'persone')"
          :value="namePersone"
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
          :value="phone"
        />

        <ui-error
          v-for="error in errorsFormData?.phone?.errors ?? []"
          :key="error"
          :text="error"
        />

        <ui-btn class="button">
          <ui-text-h3> ДІЗНАТИСЯ ВАРТІСТЬ </ui-text-h3>
        </ui-btn>
      </form>
    </div>

    <modal-done v-if="showModal == 'done'" />
    <modal-error v-if="showModal == 'error'" />
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { app } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";

import UiTextH1 from "~/components/UI/UiTextH1";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiInput from "~/components/UI/UiInput.vue";
import IconClose from "~/assets/icon/IconClose.vue";
import ModalDone from "~/components/Block/Modal/ModallDone.vue";
import ModalError from "~/components/Block/Modal/ModalError.vue";

import UiBtn from "~/components/UI/UiBtn.vue";

const emit = defineEmits(["closeModal"]);
const props = defineProps({
  qwery: String,
});

const showModal = ref("empty");
const db = getFirestore(app);
const namePersone = ref("");
const phone = ref("+380");
const date = new Date();
const dateFeedback = ref();
const now = Timestamp.now();
const route = useRoute();

const closeModal = () => {
  emit("closeModal");
};

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
          qwery: props.qwery || "",
          timestamp: now,
        },
        documentId // id обьекта
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      namePersone.value = "";
      phone.value = "+380";
      form.reset();
      showModal.value = "done";

      setInterval(() => {
        closeModal();
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
.modal {
  position: absolute;
  left: 50%;
  top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 560px;
  width: 750px;
  border-radius: 20px;
  background: white;
  z-index: 5;
  transform: translateX(-50%);

  &__done {
    display: flex;
    align-items: center;
  }

  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
}
.wrapper {
  width: 100%;
}

form {
  padding: 20px;
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  margin-bottom: 42px;
  width: 500px;
  height: 69px;

  box-shadow: 4px 9px 15px 1px rgba(34, 60, 80, 0.35);
  border: none;
}
.button {
  width: 500px;
  height: 69px;

  box-shadow: 4px 9px 15px 1px rgba(34, 60, 80, 0.35);
  border: none;
  &:hover {
    background: #000;
    h2 {
      color: white;
    }
  }
}

.center {
  text-align: center;
}

.ml-20 {
  margin-left: 20px;
}
.mt-20 {
  margin-top: 20px;
}
.fw-500 {
  font-weight: 500;
}

.red {
  color: darkred;
}

@media screen and (max-width: 1023px) {
  .modal {
    width: 100%;
    &__done {
      flex-direction: column;
    }
    .ml-20 {
      margin-top: 20px;
    }
  }

  .input {
    width: 100%;
  }

  .button {
    width: 100%;
  }
}

@media screen and (max-width: 767px) {
  .modal {
    width: 100%;
    height: 450px;
  }

  form {
    margin-top: 30px;
  }
  .close {
    width: 20px;
  }
  // .input {
  //   width: 300px;
  //   margin-bottom: 30px;
  // }

  // .button {
  //   width: 300px;
  // }
}
// @media screen and (max-width: 424px) {
//   .modal {
//     width: 300px;
//   }

//   .input {
//     width: 285px;
//   }

//   .button {
//     width: 285px;
//   }
// }
</style>
