// middleware/auth.ts
import { useFirebaseAuth } from "~/stores/firebaseAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useFirebaseAuth();

    // Если метод проверки асинхронный (например, ждем Firebase), нужно подождать
    // await store.checkAuth();

    // Проверка: если не админ — редирект на главную или страницу входа
    if (!store.isAuth[0]) {
        return navigateTo('/');
    }
});