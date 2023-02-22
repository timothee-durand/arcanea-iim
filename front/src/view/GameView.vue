<template>
    <div>
        <div class="app-top">
            <DuelComponent :card.sync="card"/>
            <HistoricDuelComponent/>
        </div>
        <HandComponent @use-card="useCard"/>
    </div>
</template>
<script>
    import DuelComponent from '@/components/DuelComponent.vue';
    import HandComponent from '@/components/HandComponent.vue';
    import HistoricDuelComponent from '@/components/HistoricDuelComponent.vue';

    export default {
        name: 'GameView',
        data() {
            return {
                deck: null,
                hand: [],
                card: null,
                draft: [],
            };
        },
        components: {
            HandComponent,
            HistoricDuelComponent,
            DuelComponent,
        },
        methods : {
            useCard(card) {
                if(this.card) {
                    this.draft.push(this.card);
                }
                this.card = card;
            },
        }
    };
</script>
<style scoped lang="scss">
    .app-top {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>
