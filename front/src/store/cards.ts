import { defineStore } from "pinia";
import {CardName} from "../../../@types/cardsName";
import {cards} from "@/store/cards/cards-content";

export interface Card {
    id: number;
    name: string;
    description: string;
    image: string;
    key: CardName
    sound: string | null;
}

interface CardsState {
    cards: Card[];
}

export const useCardsStore = defineStore("cards", {
    state: (): CardsState => ({
        cards: [],
    }),
    actions: {
        async fetchCards() {
            if(this.cards.length > 0) return
            this.cards = cards
        }
    }
})
