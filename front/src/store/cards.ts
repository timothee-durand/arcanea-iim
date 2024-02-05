import {CardName} from "../../@types/cardsName";

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

