import {AbstractCard, AsyncAction} from "@/core/base";

export interface AbstractWizard {
    name: string
    cards: AbstractCard[]
    draft: AbstractCard[]
    hand: AbstractCard[]
    currentCard: AbstractCard | null
    asyncCard: AsyncAction[]
    health: number
}
