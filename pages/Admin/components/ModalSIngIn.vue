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
        @input="(event) => handleInputValue(event, 'email')"
      />

      <ui-input
        class="mt-20"
        type="password"
        placeholder="password"
        name="password"
        :value="password"
        @input="(event) => handleInputValue(event, 'password')"
      />
      <ui-btn class="mt-20">
        <ui-text-h4> ВХІД </ui-text-h4>
      </ui-btn>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UiTextH2 from "~/components/UI/UiTextH2.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiBtn from "~/components/UI/UiBtn.vue";

import { useAuthStore } from "~/stores/auth";

const { auth } = useAuthStore();

const email = ref("");
const password = ref("");

function handleInputValue(event, name) {
  switch (name) {
    case "email":
      return (email.value = event.target.value);

    case "password":
      return (password.value = event.target.value);
  }
}

const singIn = async () => {
  console.log("its working....");
  await auth({ email: email.value, password: password.value });
};
</script>

<style lang="scss" scoped>
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
</style>
