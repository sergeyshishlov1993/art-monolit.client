<template>
  <div class="tabs">
    <ui-btn
      :class="{ active: props.selectedTab == 'single' }"
      @click="selecTab('single')"
    >
      <ui-text-h4>Одинарні</ui-text-h4>
    </ui-btn>

    <ui-btn
      :class="{ active: props.selectedTab == 'double' }"
      @click="selecTab('double')"
    >
      <ui-text-h4>Подвійні</ui-text-h4>
    </ui-btn>

    <ui-btn
      :class="{ active: props.selectedTab == 'kids' }"
      @click="selecTab('kids')"
    >
      <ui-text-h4>Дитячі</ui-text-h4>
    </ui-btn>

    <ui-btn
      :class="{ active: props.selectedTab == 'memorial' }"
      @click="selecTab('memorial')"
    >
      <ui-text-h4>Меморіальні комплекси</ui-text-h4>
    </ui-btn>

    <ui-btn
      :class="{ active: props.selectedTab == 'accessories' }"
      @click="selecTab('accessories')"
    >
      <ui-text-h4>Аксесуари</ui-text-h4>
    </ui-btn>

    <ui-btn
      :class="{ active: props.selectedTab == 'cross' }"
      @click="selecTab('cross')"
    >
      <ui-text-h4>Хрести</ui-text-h4>
    </ui-btn>

    <ui-btn
      :class="{ active: props.selectedTab == 'war' }"
      @click="selecTab('war')"
    >
      <ui-text-h4>Військовим</ui-text-h4>
    </ui-btn>
  </div>
</template>

<script setup>
import UiBtn from "~/components/UI/UiBtn.vue";
import UiTextH4 from "~/components/UI/UiTextH4.vue";
const emit = defineEmits(["selecTab"]);
const props = defineProps({
  selectedTab: {
    type: String,
    requred: true,
  },
});

function selecTab(tab) {
  emit("selecTab", tab);
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  button {
    min-width: 250px;
    margin-bottom: 18px;
    &:hover {
      background: #000;
      color: white;
      border: 1px solid black;
    }
  }
}

.active {
  background: #000;
  color: white;
  border: 1px solid black;
}

@media screen and (max-width: 1023px) {
  .tabs {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    button {
      min-width: 200px;
      margin-right: 15px;
    }
  }
}

@media screen and (max-width: 768px) {
  .tabs {
    button {
      min-width: 0px;
    }
  }
}
</style>
