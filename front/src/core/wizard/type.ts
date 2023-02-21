import {AbstractCard, AbstractAsyncAction} from "@/core/base";

export interface AbstractWizard {
    name: string
    cards: AbstractCard[]
    draft: AbstractCard[]
    hand: AbstractCard[]
    currentCard: AbstractCard | null
    asyncCard: AbstractAsyncAction[]
    health: number
}
