import {AbstractAsyncAction, AbstractCard} from "../base";

export interface AbstractWizard {
    name: string
    cards: AbstractCard[]
    draft: AbstractCard[]
    hand: AbstractCard[]
    currentCard: AbstractCard | null
    asyncCard: AbstractAsyncAction[]
    health: number
}

export interface UserIim {
    iimId: string
    iimToken: string
}
