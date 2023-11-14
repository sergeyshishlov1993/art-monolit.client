<template>
  <div class="modal">
    <icon-close class="close" @click="closeModal" />

    <div class="modal__done" v-if="status === 'success'">
      <ui-text-h3 class="fw-500">ОЧІКУЙТЕ СКОРО ВАМ ЗАТЕЛЕФОНУЮТЬ !</ui-text-h3>
      <icon-done class="ml-20" />
    </div>

    <div class="modal__error" v-else-if="status === 'error'">
      <ui-text-h2 class="fw-500 red">ЩОСЬ ПІШЛО НЕ ТАК !</ui-text-h2>
      <ui-text-h2 class="fw-500 red mt-20">СПРОБУЙТЕ ПІЗНІШЕ !</ui-text-h2>
      <icon-error class="mt-20" />
    </div>

    <div v-else>
      <ui-text-h1 class="center">ДІЗНАТИСЯ ВАРТІСТЬ</ui-text-h1>

      <form @submit.prevent="submitCallBack">
        <ui-input
          class="input"
          placeholder="Ваш номер"
          name="name"
          :value="name"
        />
        <ui-input
          class="input"
          placeholder="Ваш номер"
          name="phone"
          :value="phone"
        />

        <ui-btn class="button">
          <ui-text-h3> ДІЗНАТИСЯ ВАРТІСТЬ </ui-text-h3>
        </ui-btn>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UiTextH1 from "~/components/UI/UiTextH1";
import UiTextH2 from "~/components/UI/UiTextH2.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import UiInput from "~/components/UI/UiInput.vue";
import IconClose from "~/assets/icon/IconClose.vue";
import IconDone from "~/assets/icon/iconDone.vue";
import IconError from "~/assets/icon/IconError.vue";
import UiBtn from "~/components/UI/UiBtn.vue";

const emit = defineEmits(["closeModal"]);

const status = ref(null);
const name = ref("");
const phone = ref("");

const closeModal = () => {
  emit("closeModal");
};

const submitCallBack = async () => {
  try {
    console.log(name.value);
    console.log(phone.value);
    status.value = "success";
  } catch (error) {
    status.value = "error";
  }
};
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

form {
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
  border: 1px solid black;
}
.button {
  width: 500px;
  height: 69px;
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
    width: 500px;
    &__done {
      flex-direction: column;
    }
    .ml-20 {
      margin-top: 20px;
    }
  }

  .input {
    width: 350px;
  }

  .button {
    width: 350px;
  }
}

@media screen and (max-width: 767px) {
  .modal {
    width: 320px;
    height: 450px;
  }

  form {
    margin-top: 30px;
  }
  .close {
    width: 20px;
  }
  .input {
    width: 300px;
    margin-bottom: 30px;
  }

  .button {
    width: 300px;
  }
}
@media screen and (max-width: 424px) {
  .modal {
    width: 300px;
  }

  .input {
    width: 285px;
  }

  .button {
    width: 285px;
  }
}
</style>
