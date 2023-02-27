import { defineStore } from "pinia";
import {CardName} from "../../../@types/cardsName";

export interface Card {
    id: number;
    name: string;
    description: string;
    image: string;
    key: CardName
    sound: string;
}

interface CardsState {
    cards: Card[];
    backCard: Card | null;
}

export const useCardsStore = defineStore("cards", {
    state: (): CardsState => ({
        cards: [],
        backCard: null
    }),
    actions: {
        async fetchCards() {
            if(this.cards.length > 0) return
            const myHeaders = new Headers();
            myHeaders.append('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODU5MDksImV4cCI6MTk5MjU2MTkwOX0.uq-mxWGU7ayNeoA0gkGRkWBTEz2hR1bIuReLittF0BI');
            myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Njk4NTkwOSwiZXhwIjoxOTkyNTYxOTA5fQ.RP5ToLS04asei6AMnzwDgse6LyG0vANaFqM5uzn-SJc');

            const requestOptions: RequestInit = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };

            const response = await fetch('https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards?select=*', requestOptions);
            this.cards = await response.json();

            const back = await fetch('https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards?name=eq.back', requestOptions);
            this.backCard = await back.json();
        }
    }
})
