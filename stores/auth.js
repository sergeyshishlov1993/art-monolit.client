import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const api = "AIzaSyA9n3gXB8aFAPalpJhSvn4HolQfGfY0JRo";
// const api = import.meta.env.VITE_API_KEY;
export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref({
    token: "",
    email: "",
    userId: "",
    refreshToken: "",
    expiresIn: "",
  });

  const error = reactive([""]);
  const isAuth = reactive([false]);

  const auth = async (payload) => {
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api}`,
        {
          ...payload,
          returnSecureToken: true,
        }
      );
      isAuth[0] = true;

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      };

      localStorage.setItem(
        "userToken",
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
        })
      );
    } catch (err) {
      switch (err.response.data.error.message) {
        case "EMAIL_EXISTS":
          error[0] = "email exist";
          break;

        case "OPERATION_NOT_ALLOWED":
          error[0] = "вход с паролем для этого проекта отключен";
          break;

        case "Too_MANY_ATTEMPTS_TRY_LATER":
          error[0] =
            "Мы заблокировали все запросы с этого устройства из-за необычной активности. Попробуйте позже.";
          break;
      }
      isAuth[0] = false;
    }
  };

  return { auth, userInfo, error, isAuth };
});
