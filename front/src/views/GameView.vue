<template>
  <div class="app-top">
    <DuelComponent/>
    <HistoricDuelComponent/>
  </div>
  <HandComponent/>

</template>

<script setup>
import DuelComponent from "@/components/DuelComponent.vue";
import HistoricDuelComponent from "@/components/HistoricDuelComponent.vue";
import HandComponent from "@/components/HandComponent.vue";
</script>

<style scoped>
.app-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}
</style>
