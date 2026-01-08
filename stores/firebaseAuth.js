import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
import axios from "axios";

export const useFirebaseAuth = defineStore("firebaseAuth", () => {
    const auth = getAuth(app);
    const error = ref("");

    const userInfo = reactive({
        token: "",
        email: "",
        userId: "",
        refreshToken: "",
        expiresIn: "",
    });

    const isAuth = reactive([false]);

    const saveTokenInfoToLocalStorage = (tokenInfo) => {
        localStorage.setItem("userToken", JSON.stringify(tokenInfo));
    };

    const refreshTokenIfExpired = async () => {
        try {
            const storageToken = localStorage.getItem("userToken");
            if (!storageToken) return;

            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const expiresIn = parseInt(JSON.parse(storageToken).expiresIn, 10);

            if (expiresIn && currentTimeInSeconds >= expiresIn) {
                isAuth[0] = false;
                await refreshAuthToken();
            } else {
                isAuth[0] = true;
            }
        } catch (err) {
            isAuth[0] = false;
        }
    };

    const onLoginSuccess = async (emailUser, password) => {
        error.value = "";
        try {
            const res = await signInWithEmailAndPassword(auth, emailUser, password);
            const { idToken, email, localId, refreshToken, expiresIn } = res._tokenResponse;

            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const expiresInInSeconds = currentTimeInSeconds + parseInt(expiresIn, 10);

            userInfo.token = idToken;
            userInfo.refreshToken = refreshToken;
            userInfo.userId = localId;
            userInfo.expiresIn = expiresInInSeconds;
            userInfo.email = email;

            isAuth[0] = true;

            saveTokenInfoToLocalStorage(userInfo);
        } catch (err) {
            isAuth[0] = false;

            switch (err.code) {
                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    error.value = "Невірний логін або пароль";
                    break;
                case "auth/too-many-requests":
                    error.value = "Забагато спроб. Спробуйте пізніше";
                    break;
                case "auth/invalid-email":
                    error.value = "Невірний формат пошти";
                    break;
                default:
                    error.value = "Помилка авторизації";
            }

            setTimeout(() => {
                error.value = "";
            }, 5000);
        }
    };

    const refreshAuthToken = async () => {
        try {
            const apiKey = "AIzaSyA9n3gXB8aFAPalpJhSvn4HolQfGfY0JRo";
            const storageToken = JSON.parse(localStorage.getItem("userToken"));

            if (!storageToken) return;

            const newTokens = await axios.post(
                `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
                {
                    grant_type: "refresh_token",
                    refresh_token: storageToken.refreshToken,
                }
            );

            const { access_token, email, user_id, refresh_token, expires_in } = newTokens.data;

            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const expiresInInSeconds = currentTimeInSeconds + parseInt(expires_in, 10);

            userInfo.token = access_token;
            userInfo.refreshToken = refresh_token;
            userInfo.userId = user_id;
            userInfo.expiresIn = expiresInInSeconds;
            userInfo.email = email;

            isAuth[0] = true;
            saveTokenInfoToLocalStorage(userInfo);
        } catch (err) {
            isAuth[0] = false;
        }
    };

    return {
        onLoginSuccess,
        isAuth,
        refreshTokenIfExpired,
        error,
    };
});