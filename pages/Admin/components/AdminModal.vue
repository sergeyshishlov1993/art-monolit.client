<template>
  <div class="sing-in">
    <form method="POST" @submit.prevent="singIn">
      <ui-text-h2>ВХІД</ui-text-h2>

      <ui-input
        type="email"
        placeholder="email"
        name="email"
        class="mt-20"
        :value="email"
        @focus="(event) => handleFocus(event, 'email')"
        @input="(event) => handleInputValue(event, 'email')"
        @blur="(event) => handleBlur(event, 'email')"
      />

      <ui-error
        v-for="error in errorsFormData?.email?.errors ?? []"
        :key="error"
        :text="error"
        class="error"
      />

      <ui-input
        class="mt-20"
        type="password"
        placeholder="password"
        name="password"
        :value="password"
        @focus="(event) => handleFocus(event, 'password')"
        @input="(event) => handleInputValue(event, 'password')"
        @blur="(event) => handleBlur(event, 'password')"
      />

      <ui-error
        v-for="error in errorsFormData?.password?.errors ?? []"
        :key="error"
        :text="error"
        class="error"
      />

      <ui-btn class="mt-20">
        <ui-text-h4> ВХІД </ui-text-h4>
      </ui-btn>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";

import UiTextH2 from "~/components/UI/UiTextH2.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiBtn from "~/components/UI/UiBtn.vue";
import UiError from "~/components/UI/UiError.vue";

import { useFirebaseAuth } from "~/stores/firebaseAuth";

const { onLoginSuccess } = useFirebaseAuth();

const email = ref("");
const password = ref("");

function handleFocus(event, name) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

function handleInputValue(event, name) {
  switch (name) {
    case "email":
      return (email.value = event.target.value);

    case "password":
      return (password.value = event.target.value);
  }
}

function handleBlur(event, name) {
  switch (name) {
    case "email":
      validateField((email.value = event.target.value), name);
      break;

    case "password":
      validateField((password.value = event.target.value), name);
      break;
  }
}

function doValidateForm() {
  createErrorObj("email");
  createErrorObj("password");

  validateField(email.value, "email");
  validateField(password.value, "password");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

const singIn = async () => {
  doValidateForm();
  if (!isFormValid()) {
    await onLoginSuccess(email.value, password.value);
  }
};
</script>

<style lang="scss" scoped>
.error {
  margin-top: 20px;
}
.sing-in {
  padding: 100px;
}
form {
  margin: 0 auto;
  margin-top: 100px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    width: 100%;
  }
  button {
    width: 100%;
    &:hover {
      background: #000;
      color: white;
    }
    h2 {
      font-weight: 500;
    }
  }
}

.mt-20 {
  margin-top: 20px;
}

@media screen and (max-width: 766px) {
  .sing-in {
    padding: 10px;
    padding-bottom: 100px;
  }
  form {
    width: 100%;
  }
}
</style>
