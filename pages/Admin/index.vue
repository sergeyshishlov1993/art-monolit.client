<!--&lt;!&ndash;&lt;!&ndash;<template>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  <div class="container">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    <div class="admin" v-if="isAuth[0]">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      <div class="admin__wrapper">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <div class="admin-wrapper__navbar">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <ui-text-h3&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;              v-for="tab in tabs"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;              :key="tab.value"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;              @click="activeTab = tab.value"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;              :class="{ active: activeTab === tab.value }"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          >&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            {{ tab.label }}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          </ui-text-h3>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        </div>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;        <component :is="activeComponent" :adminTab="activeTab" />&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    </div>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;    <template v-else>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      <modal-sing-in />&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;      <transition name="fade">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <div v-if="error" class="error-alert">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <span class="error-icon">!</span>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <span class="error-text">{{ error }}</span>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      </transition>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    </template>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</template>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;<script setup lang="ts">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;import { ref, computed, onMounted, defineAsyncComponent } from "vue";&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;import { storeToRefs } from "pinia";&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;import { useFirebaseAuth } from "~/stores/firebaseAuth";&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;import UiTextH3 from "~/components/UI/UiTextH3.vue";&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;import ModalSingIn from "./components/AdminModal.vue";&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;const CallBackTable = defineAsyncComponent(() => import("./sections/CallBackTable.vue"));&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;const AddProduct = defineAsyncComponent(() => import("./sections/AddProduct.vue"));&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;const AdminCatalog = defineAsyncComponent(() => import("./sections/AdminCatalog.vue"));&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;const AdminOurWork = defineAsyncComponent(() => import("./sections/AdminOurWork.vue"));&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;const store = useFirebaseAuth();&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;// error забираем через storeToRefs, так как это ref&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;const { error } = storeToRefs(store);&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;// isAuth забираем напрямую, так как это reactive массив&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;const { isAuth, refreshTokenIfExpired } = store;&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;const activeTab = ref<string>("feedback");&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;const tabs = [&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  { label: "ПЕРЕДЗВОНИТИ", value: "feedback" },&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  { label: "ДОДАТИ ТОВАР", value: "add" },&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  { label: "КАТАЛОГ", value: "catalog" },&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  { label: "НАШІ РОБОТИ", value: "ourWork" },&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;];&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;const activeComponent = computed(() => {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  switch (activeTab.value) {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    case "feedback": return CallBackTable;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    case "add": return AddProduct;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    case "catalog": return AdminCatalog;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    case "ourWork": return AdminOurWork;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    default: return null;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;});&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;onMounted(async () => {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  await refreshTokenIfExpired();&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;});&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</script>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;<style lang="scss" scoped>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;.container {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  min-width: 100%;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  padding: 0;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  position: relative;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;}&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;.admin {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  &-wrapper {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    height: 100vh;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    display: flex;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    flex-direction: column;&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;    &__navbar {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      padding: 30px 50px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      display: flex;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      align-items: center;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      justify-content: space-between;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      background: #000;&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;      :deep(h3) {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        color: white;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        cursor: pointer;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        transition: all 0.3s ease;&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;        &:hover {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          background: linear-gradient(&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  to bottom,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  #f2be5c 14%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  #f2be5c 16%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  #d99036 10%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  #cfc09f 32%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  #ffecb3 40%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  #3a2c0f 99%&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          );&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          -webkit-background-clip: text;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          -webkit-text-fill-color: transparent;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          color: transparent;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          font-weight: 500;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;}&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;.active {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  :deep(h3) {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    font-weight: 500;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    background: linear-gradient(&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            to bottom,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            #f2be5c 14%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            #f2be5c 16%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            #d99036 10%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            #cfc09f 32%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            #ffecb3 40%,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            #3a2c0f 99%&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    ) !important;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    -webkit-background-clip: text !important;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    -webkit-text-fill-color: transparent !important;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    color: transparent !important;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;}&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;.error-alert {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  position: fixed;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  top: 20px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  right: 20px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  z-index: 10000;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  background-color: #ffebee;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  border: 1px solid #ffcdd2;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  border-left: 4px solid #f44336;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  color: #b71c1c;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  padding: 16px 20px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  border-radius: 4px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  box-shadow: 0 4px 6px rgba(0,0,0,0.1);&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  display: flex;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  align-items: center;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  gap: 12px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  min-width: 300px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  max-width: 90vw;&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;  .error-icon {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    display: flex;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    justify-content: center;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    align-items: center;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    width: 24px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    height: 24px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    background: #f44336;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    color: white;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    border-radius: 50%;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    font-weight: bold;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    font-size: 14px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    flex-shrink: 0;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  }&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;  .error-text {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    font-size: 14px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    font-weight: 500;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;}&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-20px); }&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;@media screen and (max-width: 1023px) {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  .admin-wrapper__navbar {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    padding: 20px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;}&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;@media screen and (max-width: 767px) {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  .admin-wrapper__navbar {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    flex-direction: column;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    gap: 15px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  }&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;  .error-alert {&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    top: 10px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    left: 10px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    right: 10px;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;    min-width: auto;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;  }&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</style>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="container">&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="admin" v-if="isAuth[0]">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="admin__wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="admin-wrapper__navbar">&ndash;&gt;-->
<!--&lt;!&ndash;          <ui-text-h3&ndash;&gt;-->
<!--&lt;!&ndash;              v-for="tab in tabs"&ndash;&gt;-->
<!--&lt;!&ndash;              :key="tab.value"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="activeTab = tab.value"&ndash;&gt;-->
<!--&lt;!&ndash;              :class="{ active: activeTab === tab.value }"&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;            {{ tab.label }}&ndash;&gt;-->
<!--&lt;!&ndash;          </ui-text-h3>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->

<!--&lt;!&ndash;        <component :is="activeComponent" :adminTab="activeTab" />&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->

<!--&lt;!&ndash;    <template v-else>&ndash;&gt;-->
<!--&lt;!&ndash;      <modal-sing-in />&ndash;&gt;-->

<!--&lt;!&ndash;      <transition name="fade">&ndash;&gt;-->
<!--&lt;!&ndash;        <div v-if="error" class="error-alert">&ndash;&gt;-->
<!--&lt;!&ndash;          <span class="error-icon">!</span>&ndash;&gt;-->
<!--&lt;!&ndash;          <span class="error-text">{{ error }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </transition>&ndash;&gt;-->
<!--&lt;!&ndash;    </template>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script setup lang="ts">&ndash;&gt;-->
<!--&lt;!&ndash;import { ref, computed, onMounted, defineAsyncComponent } from "vue";&ndash;&gt;-->
<!--&lt;!&ndash;import { storeToRefs } from "pinia";&ndash;&gt;-->
<!--&lt;!&ndash;import { useFirebaseAuth } from "~/stores/firebaseAuth";&ndash;&gt;-->
<!--&lt;!&ndash;import UiTextH3 from "~/components/UI/UiTextH3.vue";&ndash;&gt;-->
<!--&lt;!&ndash;import ModalSingIn from "./components/AdminModal.vue";&ndash;&gt;-->

<!--&lt;!&ndash;const CallBackTable = defineAsyncComponent(() => import("./sections/CallBackTable.vue"));&ndash;&gt;-->
<!--&lt;!&ndash;const AddProduct = defineAsyncComponent(() => import("./sections/AddProduct.vue"));&ndash;&gt;-->
<!--&lt;!&ndash;const AdminCatalog = defineAsyncComponent(() => import("./sections/AdminCatalog.vue"));&ndash;&gt;-->
<!--&lt;!&ndash;const AdminOurWork = defineAsyncComponent(() => import("./sections/AdminOurWork.vue"));&ndash;&gt;-->

<!--&lt;!&ndash;const store = useFirebaseAuth();&ndash;&gt;-->
<!--&lt;!&ndash;const { error } = storeToRefs(store);&ndash;&gt;-->
<!--&lt;!&ndash;const { isAuth, refreshTokenIfExpired } = store;&ndash;&gt;-->

<!--&lt;!&ndash;const activeTab = ref<string>("feedback");&ndash;&gt;-->

<!--&lt;!&ndash;const tabs = [&ndash;&gt;-->
<!--&lt;!&ndash;  { label: "ПЕРЕДЗВОНИТИ", value: "feedback" },&ndash;&gt;-->
<!--&lt;!&ndash;  { label: "ДОДАТИ ТОВАР", value: "add" },&ndash;&gt;-->
<!--&lt;!&ndash;  { label: "КАТАЛОГ", value: "catalog" },&ndash;&gt;-->
<!--&lt;!&ndash;  { label: "НАШІ РОБОТИ", value: "ourWork" },&ndash;&gt;-->
<!--&lt;!&ndash;];&ndash;&gt;-->

<!--&lt;!&ndash;const activeComponent = computed(() => {&ndash;&gt;-->
<!--&lt;!&ndash;  switch (activeTab.value) {&ndash;&gt;-->
<!--&lt;!&ndash;    case "feedback": return CallBackTable;&ndash;&gt;-->
<!--&lt;!&ndash;    case "add": return AddProduct;&ndash;&gt;-->
<!--&lt;!&ndash;    case "catalog": return AdminCatalog;&ndash;&gt;-->
<!--&lt;!&ndash;    case "ourWork": return AdminOurWork;&ndash;&gt;-->
<!--&lt;!&ndash;    default: return null;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;});&ndash;&gt;-->

<!--&lt;!&ndash;onMounted(async () => {&ndash;&gt;-->
<!--&lt;!&ndash;  await refreshTokenIfExpired();&ndash;&gt;-->
<!--&lt;!&ndash;});&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<style lang="scss" scoped>&ndash;&gt;-->
<!--&lt;!&ndash;.container {&ndash;&gt;-->
<!--&lt;!&ndash;  min-width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 0;&ndash;&gt;-->
<!--&lt;!&ndash;  position: relative;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.admin {&ndash;&gt;-->
<!--&lt;!&ndash;  &-wrapper {&ndash;&gt;-->
<!--&lt;!&ndash;    height: 100vh;&ndash;&gt;-->
<!--&lt;!&ndash;    display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;    flex-direction: column;&ndash;&gt;-->

<!--&lt;!&ndash;    &__navbar {&ndash;&gt;-->
<!--&lt;!&ndash;      padding: 30px 50px;&ndash;&gt;-->
<!--&lt;!&ndash;      display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;      align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;      justify-content: space-between;&ndash;&gt;-->
<!--&lt;!&ndash;      background: #000;&ndash;&gt;-->

<!--&lt;!&ndash;      :deep(h3) {&ndash;&gt;-->
<!--&lt;!&ndash;        color: white;&ndash;&gt;-->
<!--&lt;!&ndash;        cursor: pointer;&ndash;&gt;-->
<!--&lt;!&ndash;        transition: all 0.3s ease;&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->

<!--&lt;!&ndash;      // Объединяем стили для hover и активного класса&ndash;&gt;-->
<!--&lt;!&ndash;      :deep(h3):hover,&ndash;&gt;-->
<!--&lt;!&ndash;      .active :deep(h3) {&ndash;&gt;-->
<!--&lt;!&ndash;        font-weight: 500;&ndash;&gt;-->
<!--&lt;!&ndash;        background: linear-gradient(&ndash;&gt;-->
<!--&lt;!&ndash;                to bottom,&ndash;&gt;-->
<!--&lt;!&ndash;                #f2be5c 14%,&ndash;&gt;-->
<!--&lt;!&ndash;                #f2be5c 16%,&ndash;&gt;-->
<!--&lt;!&ndash;                #d99036 10%,&ndash;&gt;-->
<!--&lt;!&ndash;                #cfc09f 32%,&ndash;&gt;-->
<!--&lt;!&ndash;                #ffecb3 40%,&ndash;&gt;-->
<!--&lt;!&ndash;                #3a2c0f 99%&ndash;&gt;-->
<!--&lt;!&ndash;        ) !important;&ndash;&gt;-->
<!--&lt;!&ndash;        -webkit-background-clip: text !important;&ndash;&gt;-->
<!--&lt;!&ndash;        -webkit-text-fill-color: transparent !important;&ndash;&gt;-->
<!--&lt;!&ndash;        color: transparent !important;&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.error-alert {&ndash;&gt;-->
<!--&lt;!&ndash;  position: fixed;&ndash;&gt;-->
<!--&lt;!&ndash;  top: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  right: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  z-index: 10000;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #ffebee;&ndash;&gt;-->
<!--&lt;!&ndash;  border: 1px solid #ffcdd2;&ndash;&gt;-->
<!--&lt;!&ndash;  border-left: 4px solid #f44336;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #b71c1c;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 16px 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 4px;&ndash;&gt;-->
<!--&lt;!&ndash;  box-shadow: 0 4px 6px rgba(0,0,0,0.1);&ndash;&gt;-->
<!--&lt;!&ndash;  display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;  align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;  gap: 12px;&ndash;&gt;-->
<!--&lt;!&ndash;  min-width: 300px;&ndash;&gt;-->
<!--&lt;!&ndash;  max-width: 90vw;&ndash;&gt;-->

<!--&lt;!&ndash;  .error-icon {&ndash;&gt;-->
<!--&lt;!&ndash;    display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;    justify-content: center;&ndash;&gt;-->
<!--&lt;!&ndash;    align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;    width: 24px;&ndash;&gt;-->
<!--&lt;!&ndash;    height: 24px;&ndash;&gt;-->
<!--&lt;!&ndash;    background: #f44336;&ndash;&gt;-->
<!--&lt;!&ndash;    color: white;&ndash;&gt;-->
<!--&lt;!&ndash;    border-radius: 50%;&ndash;&gt;-->
<!--&lt;!&ndash;    font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;    font-size: 14px;&ndash;&gt;-->
<!--&lt;!&ndash;    flex-shrink: 0;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->

<!--&lt;!&ndash;  .error-text {&ndash;&gt;-->
<!--&lt;!&ndash;    font-size: 14px;&ndash;&gt;-->
<!--&lt;!&ndash;    font-weight: 500;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }&ndash;&gt;-->
<!--&lt;!&ndash;.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-20px); }&ndash;&gt;-->

<!--&lt;!&ndash;@media screen and (max-width: 1023px) {&ndash;&gt;-->
<!--&lt;!&ndash;  .admin-wrapper__navbar {&ndash;&gt;-->
<!--&lt;!&ndash;    padding: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;@media screen and (max-width: 767px) {&ndash;&gt;-->
<!--&lt;!&ndash;  .admin-wrapper__navbar {&ndash;&gt;-->
<!--&lt;!&ndash;    flex-direction: column;&ndash;&gt;-->
<!--&lt;!&ndash;    gap: 15px;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->

<!--&lt;!&ndash;  .error-alert {&ndash;&gt;-->
<!--&lt;!&ndash;    top: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;    left: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;    right: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;    min-width: auto;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--<template>-->
<!--  <div class="container">-->
<!--    <div class="admin" v-if="isAuth[0]">-->
<!--      <div class="admin__wrapper">-->
<!--        <div class="admin-wrapper__navbar">-->
<!--          <ui-text-h3-->
<!--              @click="changeTab('feedback')"-->
<!--              :class="{ active: activeTab == 'feedback' }"-->
<!--          >ПЕРЕДЗВОНИТИ</ui-text-h3-->
<!--          >-->
<!--          <ui-text-h3-->
<!--              @click="changeTab('add')"-->
<!--              :class="{ active: activeTab == 'add' }"-->
<!--          >ДОДАТИ ТОВАР</ui-text-h3-->
<!--          >-->
<!--          <ui-text-h3-->
<!--              @click="changeTab('catalog')"-->
<!--              :class="{ active: activeTab == 'catalog' }"-->
<!--          >КАТАЛОГ</ui-text-h3-->
<!--          >-->
<!--          <ui-text-h3-->
<!--              @click="changeTab('ourWork')"-->
<!--              :class="{ active: activeTab == 'ourWork' }"-->
<!--          >НАШІ РОБОТИ</ui-text-h3-->
<!--          >-->
<!--        </div>-->
<!--        &lt;!&ndash; -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->

<!--        <component :is="tabContent" :adminTab="activeTab"></component>-->
<!--      </div>-->
<!--    </div>-->

<!--    <modal-sing-in v-else />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, computed, onMounted } from "vue";-->
<!--import UiTextH3 from "~/components/UI/UiTextH3.vue";-->
<!--import CallBackTable from "./sections/CallBackTable.vue";-->
<!--import AddProduct from "./sections/AddProduct.vue";-->
<!--import AdminCatalog from "./sections/AdminCatalog.vue";-->
<!--import AdminOurWork from "./sections/AdminOurWork.vue";-->
<!--import ModalSingIn from "./components/AdminModal.vue";-->

<!--onMounted(async () => {-->
<!--  await refreshTokenIfExpired();-->
<!--});-->

<!--import { useFirebaseAuth } from "~/stores/firebaseAuth";-->

<!--const { isAuth, refreshTokenIfExpired } = useFirebaseAuth();-->

<!--const activeTab = ref("feedback");-->

<!--function changeTab(name) {-->
<!--  return (activeTab.value = name);-->
<!--}-->

<!--const tabContent = computed(() => {-->
<!--  switch (activeTab.value) {-->
<!--    case "feedback":-->
<!--      return CallBackTable;-->

<!--    case "add":-->
<!--      return AddProduct;-->

<!--    case "catalog":-->
<!--      return AdminCatalog;-->

<!--    case "ourWork":-->
<!--      return AdminOurWork;-->
<!--  }-->
<!--});-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.admin {-->
<!--  &-wrapper {-->
<!--    height: 100vh;-->
<!--    &__navbar {-->
<!--      padding: 30px 50px;-->
<!--      display: flex;-->
<!--      align-items: center;-->
<!--      justify-content: space-between;-->
<!--      background: #000;-->
<!--      h2 {-->
<!--        color: white;-->
<!--        cursor: pointer;-->
<!--        &:hover {-->
<!--          background: linear-gradient(-->
<!--                  to bottom,-->
<!--                  #f2be5c 14%,-->
<!--                  #f2be5c 16%,-->
<!--                  #d99036 10%,-->
<!--                  #cfc09f 32%,-->
<!--                  #ffecb3 40%,-->
<!--                  #3a2c0f 99%-->
<!--          );-->
<!--          -webkit-background-clip: text;-->
<!--          -webkit-text-fill-color: transparent;-->

<!--          color: transparent;-->
<!--          font-weight: 500;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--.center {-->
<!--  text-align: center;-->
<!--}-->

<!--.active {-->
<!--  font-weight: 500;-->
<!--  background: linear-gradient(-->
<!--          to bottom,-->
<!--          #f2be5c 14%,-->
<!--          #f2be5c 16%,-->
<!--          #d99036 10%,-->
<!--          #cfc09f 32%,-->
<!--          #ffecb3 40%,-->
<!--          #3a2c0f 99%-->
<!--  );-->
<!--  -webkit-background-clip: text;-->
<!--  -webkit-text-fill-color: transparent;-->

<!--  color: transparent;-->
<!--}-->
<!--@media screen and (min-width: 1440px) {-->
<!--  .container {-->
<!--    min-width: 100%;-->
<!--    padding: 0;-->
<!--  }-->
<!--}-->
<!--@media screen and (max-width: 1399px) {-->
<!--  .container {-->
<!--    min-width: 100%;-->
<!--    padding: 0;-->
<!--  }-->
<!--}-->

<!--@media screen and (max-width: 1023px) {-->
<!--  .admin-wrapper__navbar {-->
<!--    padding: 20px;-->
<!--  }-->
<!--}-->

<!--@media screen and (max-width: 767px) {-->
<!--  .admin-wrapper__navbar {-->
<!--    flex-direction: column;-->
<!--    h2 {-->
<!--      margin-bottom: 10px;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->

<template>
  <div class="container">
    <div class="admin" v-if="isAuth[0]">
      <div class="admin__wrapper">
        <div class="admin-wrapper__navbar">
          <ui-text-h3
              @click="changeTab('feedback')"
              :class="{ active: activeTab == 'feedback' }"
          >ПЕРЕДЗВОНИТИ</ui-text-h3
          >
          <ui-text-h3
              @click="changeTab('add')"
              :class="{ active: activeTab == 'add' }"
          >ДОДАТИ ТОВАР</ui-text-h3
          >
          <ui-text-h3
              @click="changeTab('catalog')"
              :class="{ active: activeTab == 'catalog' }"
          >КАТАЛОГ</ui-text-h3
          >
          <ui-text-h3
              @click="changeTab('ourWork')"
              :class="{ active: activeTab == 'ourWork' }"
          >НАШІ РОБОТИ</ui-text-h3
          >
        </div>
        <component :is="tabContent" :adminTab="activeTab"></component>
      </div>
    </div>

    <template v-else>
      <modal-sing-in />

      <transition name="fade">
        <div v-if="error" class="error-alert">
          <span class="error-icon">!</span>
          <span class="error-text">{{ error }}</span>
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import CallBackTable from "./sections/CallBackTable.vue";
import AddProduct from "./sections/AddProduct.vue";
import AdminCatalog from "./sections/AdminCatalog.vue";
import AdminOurWork from "./sections/AdminOurWork.vue";
import ModalSingIn from "./components/AdminModal.vue";
import { useFirebaseAuth } from "~/stores/firebaseAuth";

const store = useFirebaseAuth();
const { isAuth, refreshTokenIfExpired } = store;
const { error } = storeToRefs(store);

onMounted(async () => {
  await refreshTokenIfExpired();
});

const activeTab = ref("feedback");

function changeTab(name) {
  return (activeTab.value = name);
}

const tabContent = computed(() => {
  switch (activeTab.value) {
    case "feedback":
      return CallBackTable;

    case "add":
      return AddProduct;

    case "catalog":
      return AdminCatalog;

    case "ourWork":
      return AdminOurWork;
  }
});
</script>

<style lang="scss" scoped>
.admin {
  &-wrapper {
    height: 100vh;
    &__navbar {
      padding: 30px 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #000;
      h2 {
        color: white;
        cursor: pointer;
        &:hover {
          background: linear-gradient(
                  to bottom,
                  #f2be5c 14%,
                  #f2be5c 16%,
                  #d99036 10%,
                  #cfc09f 32%,
                  #ffecb3 40%,
                  #3a2c0f 99%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          color: transparent;
          font-weight: 500;
        }
      }
    }
  }
}
.center {
  text-align: center;
}

.active {
  font-weight: 500;
  background: linear-gradient(
          to bottom,
          #f2be5c 14%,
          #f2be5c 16%,
          #d99036 10%,
          #cfc09f 32%,
          #ffecb3 40%,
          #3a2c0f 99%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  color: transparent;
}

.error-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  border-left: 4px solid #f44336;
  color: #b71c1c;
  padding: 16px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  max-width: 90vw;

  .error-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: #f44336;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    font-size: 14px;
    flex-shrink: 0;
  }

  .error-text {
    font-size: 14px;
    font-weight: 500;
  }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-20px); }

@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
    padding: 0;
  }
}
@media screen and (max-width: 1399px) {
  .container {
    min-width: 100%;
    padding: 0;
  }
}

@media screen and (max-width: 1023px) {
  .admin-wrapper__navbar {
    padding: 20px;
  }
}

@media screen and (max-width: 767px) {
  .admin-wrapper__navbar {
    flex-direction: column;
    h2 {
      margin-bottom: 10px;
    }
  }

  .error-alert {
    top: 10px;
    left: 10px;
    right: 10px;
    min-width: auto;
  }
}
</style>