import {Wizard} from "../wizard";
import {CardName} from "../../../@types/cardsName";
import {HistoryAction} from "../../../@types/dto/HistoryAction";


export type Order = 0 | 1 | 2



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
