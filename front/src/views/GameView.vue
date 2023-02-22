<template>
  <div class="app-duel">

    <div class="app-top">
      <DuelComponent/>
      <HistoricDuelComponent/>
    </div>
    <HandComponent/>
  </div>
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

.app-duel {
  background: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1),rgba(19,35,59,1));
}
</style>
