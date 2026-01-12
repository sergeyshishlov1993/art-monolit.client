<template>
  <div class="modal">
    <icon-close class="close" @click="closeModal" />

    <div v-if="showModal == 'empty'" class="wrapper">
      <ui-text-h1 class="center">ДІЗНАТИСЯ ВАРТІСТЬ</ui-text-h1>

      <div v-if="modalStep === 'intro'" class="intro">
        <div class="intro__text">
          <ui-text-h3 class="intro__text-content">
            Вартість може відрізнятися залежно від матеріалу, розміру та доставки.
            Щоб дізнатися точний розрахунок — надішліть заявку менеджеру або зв’яжіться з ним у Viber.
          </ui-text-h3>
        </div>

        <div class="intro__actions">
          <a
              class="intro__viberLink"
              :href="viberChatLink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написати менеджеру у Viber"
          >
            <ui-btn class="button button--viber" type="button">
              <IconViber class="button__icon" />
              <ui-text-h3>НАПИСАТИ У VIBER</ui-text-h3>
            </ui-btn>
          </a>

          <ui-btn class="button" type="button" @click="openFormStep">
            <ui-text-h3>ОТРИМАТИ ТОЧНИЙ РОЗРАХУНОК</ui-text-h3>
          </ui-btn>
        </div>
      </div>

      <form v-else @submit.prevent="sendFeedback">
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
            class="input"
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

        <div class="formActions">
          <ui-btn class="button button--secondary" type="button" @click="openIntroStep">
            <ui-text-h3>НАЗАД</ui-text-h3>
          </ui-btn>

          <ui-btn class="button">
            <ui-text-h3> ДІЗНАТИСЯ ВАРТІСТЬ </ui-text-h3>
          </ui-btn>
        </div>
      </form>
    </div>

    <modal-done v-if="showModal == 'done'" />
    <modal-error v-if="showModal == 'error'" />
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { app } from "../firebaseConfig";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { errorsFormData, validateField, createErrorObj } from "~/utils/validation";

import UiTextH1 from "~/components/UI/UiTextH1";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiInput from "~/components/UI/UiInput.vue";
import IconClose from "~/assets/icon/IconClose.vue";
import IconViber from "~/assets/icon/IconViber.vue";
import ModalDone from "~/components/Block/Modal/ModallDone.vue";
import ModalError from "~/components/Block/Modal/ModalError.vue";
import UiBtn from "~/components/UI/UiBtn.vue";

const emit = defineEmits(["closeModal"]);
const props = defineProps({
  qwery: String,
  currentPath: String,
});

const showModal = ref("empty");
const modalStep = ref("intro");

const viberChatLink = "viber://chat?number=%2B380985024333";

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

const openFormStep = () => {
  modalStep.value = "form";
};

const openIntroStep = () => {
  modalStep.value = "intro";
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
      event.target.value = event.target.value.replace(/[^0-9+]/g, "");
      if (!event.target.value.startsWith("+380")) {
        event.target.value =
            "+380" + event.target.value.replace(/[^0-9]/g, "").substring(3);
      }
      phone.value = event.target.value;
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
          cardCollection,
          {
            name: namePersone.value,
            phone: phone.value,
            date: getDateFeedback().format(date),
            status: "в обробці",
            qwery: props.qwery || "",
            item: props.currentPath || "",
            timestamp: now,
          },
          documentId
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
        modalStep.value = "intro";
      }, 4000);
    } catch (error) {
      showModal.value = "error";

      setInterval(() => {
        showModal.value = "empty";
        modalStep.value = "intro";
      }, 4000);
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 560px;
  width: 750px;
  border-radius: 20px;
  background: white;
  z-index: 5;

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

.intro {
  padding: 20px;
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.intro__text {
  width: 100%;
  max-width: 560px;
  border-radius: 14px;
  padding: 16px 18px;
  background: rgba(115, 96, 242, 0.08);
  border: 1px solid rgba(115, 96, 242, 0.25);
  box-shadow: 0 8px 14px rgba(0, 0, 0, 0.08);
}

.intro__text-content {
  text-align: center;
  line-height: 1.45;
}

.intro__actions {
  margin-top: 26px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.intro__viberLink {
  width: 500px;
  text-decoration: none;
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

.formActions {
  width: 500px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
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

.button--secondary {
  background: transparent;
}

.button--viber {
  background: #fff;
  border: 1px solid rgba(115, 96, 242, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #000;
    border-color: #000;
    h2 {
      color: #fff;
    }
  }
}

.button__icon {
  width: 26px;
  height: 26px;
  display: block;
}

.center {
  text-align: center;
}

.mt-45 {
  margin-top: 45px;
}

@media screen and (max-width: 1023px) {
  .modal {
    width: 100%;
    &__done {
      flex-direction: column;
    }
  }

  .input {
    width: 100%;
  }

  .button {
    width: 100%;
  }

  .intro__viberLink {
    width: 100%;
  }

  .formActions {
    width: 100%;
    flex-direction: column;
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

  .intro {
    margin-top: 30px;
  }

  .close {
    width: 20px;
  }
}
</style>
