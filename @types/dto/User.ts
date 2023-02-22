import {CardName} from "../cardsName";

export interface UserDto {
    id: string,
    name: string,
    cards: CardName[],
    draft: CardName[],
    hand: CardName[],
    currentCard: CardName,
    health: number,
}
