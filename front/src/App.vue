<script setup lang="ts">
    import Login from './components/login.vue'
    import DuelComponent from "@/components/DuelComponent.vue";
    import HistoricDuelComponent from "@/components/HistoricDuelComponent.vue";
    import HandComponent from "@/components/HandComponent.vue";
</script>
<template>
  <div id="app">
    <div class="app-top">
        <DuelComponent/>
        <HistoricDuelComponent/>

    </div>
    <HandComponent/>
  </div>
</template>

<style scoped lang="scss">
    .app-top {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

    }


</style>
