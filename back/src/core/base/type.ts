import {Wizard} from "../wizard";
import {CardName} from "../../../../@types/cardsName";


export type Order = 0 | 1 | 2

export interface HistoryAction {
    player: {
        name: string,
    },
    card: {
        name: string,
            type: "Attack" | "Defense" | "Utility"
    },
    info: string
}

interface Action {
    action: (object : {attacker: Wizard, defender: Wizard}) => Promise<{ action : HistoryAction, block : boolean }>

}

export interface AbstractCard extends Action {
    key: CardName
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
