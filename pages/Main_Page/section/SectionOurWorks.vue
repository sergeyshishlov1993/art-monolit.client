<template>
  <div class="wrapper">
    <ui-text-h1 class="white">НАШІ РАБОТИ</ui-text-h1>

    <div class="work-card">
      <card-our-work
        v-for="(card, index) in 6"
        :key="card"
        :number="index + 1"
      />
    </div>

    <ui-btn class="button">
      <ui-text-h3 class="white" @click="$router.push('/our_works')"
        >ПЕРЕГЛЯНУТИ ГАЛЕРЕЮ</ui-text-h3
      >
    </ui-btn>
  </div>
</template>

<script setup>
import UiTextH1 from "~/components/UI/UiTextH1.vue";
import UiTextH3 from "~/components/UI/UiTextH3.vue";
import CardOurWork from "../components/CardOurWork.vue";
import UiBtn from "~/components/UI/UiBtn.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  background: #000;
}

.work-card {
  padding: 90px 50px;
  display: grid;
  //   grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(250px, 1fr));
  gap: 50px;
}
.white {
  text-align: center;
  color: white;
}

.button {
  margin-top: 100px;
  min-width: 300px;
  align-self: center;
  border: 1px solid white;

  &:hover {
    background: white;
    h2 {
      color: #000;
      font-weight: 500;
    }
  }
}
@media screen and (max-width: 1023px) {
  .work-card {
    grid-template-columns: repeat(2, 1fr);
  }

  .button {
    margin-top: 75px;
    min-width: 250px;
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 100px 20px;
  }

  .work-card {
    padding: 60px 20px;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
  }
}
</style>
