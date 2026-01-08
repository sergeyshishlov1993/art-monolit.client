
import { useFirebaseAuth } from "~/stores/firebaseAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useFirebaseAuth();


    if (!store.isAuth[0]) {
        return navigateTo('/');
    }
});