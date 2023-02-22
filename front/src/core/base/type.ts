import {Wizard} from "@/core/wizard/Wizard";

export type Order = 0 | 1 | 2

interface Action {
    action: (object : {attacker: Wizard, defender: Wizard}) => Promise<boolean>

}

export interface AbstractCard extends Action {
    key: string
    title: string
    description?: string
    image?: string
    sound?: string
    // the higher the order, the earlier the card is played
    order: Order
}

export interface AbstractAsyncAction extends Action {
    turns: number
    remainingTurns: number
    passTurn: () => void
}
