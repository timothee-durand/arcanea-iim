import {getCardByName} from "../cards/hydrater";
import {ApiCard} from "../duel/Duel";
import {AbstractAsyncAction, AbstractCard} from "../base";
import {AbstractWizard} from "./type";
import {v4} from "uuid";
import {UserDto} from "../../../../@types/dto";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";


export class Wizard implements AbstractWizard {
    id: string
    name: string
    cards: AbstractCard[] = [];
    draft: AbstractCard[] = [];
    hand: AbstractCard[] = [];
    asyncCard: AbstractAsyncAction[] = [];
    currentCard: AbstractCard | null = null;
    health: number = 100;
    isBlockedNextTurn = false;
    userIim: object  = {};

    constructor(name: string, apiCards: ApiCard[], userIim: object) {
        this.id = v4()
        this.name = name
        this.userIim = userIim
        this.cards = apiCards.map(apiCard => {
            const card = getCardByName(apiCard.key)
            if(!card) {
                throw new Error(`Card ${apiCard.key} not found`)
            }
            return card
        }).filter(card => card !== undefined) as AbstractCard[];
    }

    takeDamage(damage: number) {
        this.health -= damage;
    }

    addAsyncAction(asyncAction: AbstractAsyncAction) {
        this.asyncCard.push(asyncAction);
    }

    async executeAsyncAction(attacker: Wizard) : Promise<{ actions: HistoryAction[], block :boolean }> {
        const historyActions: HistoryAction[] = [];
        let blocked = false;
        for (const asyncAction of this.asyncCard) {
            const result = await asyncAction.action({defender: this, attacker});
            historyActions.push(result.action)
            if(result.block) {
                blocked = true;
            }
            asyncAction.passTurn()
            console.log(`${this.name} executed async action ${typeof asyncAction} with ${asyncAction.remainingTurns} remaining turns`)
            if (asyncAction.remainingTurns === 0) {
                this.asyncCard = this.asyncCard.filter(action => action !== asyncAction)
            }
        }
        if(blocked) {
            console.log(`${this.name} will be blocked next turn`)
            this.isBlockedNextTurn = true;
        }
        return {actions: historyActions, block: blocked}
    }

    toObject(): UserDto {
        return {
            id: this.id,
            name: this.name,
            cards: this.cards.map(card => card.key),
            draft: this.draft.map(card => card.key),
            hand: this.hand.map(card => card.key),
            currentCard: this.currentCard?.key,
            health: this.health,
            userIim: this.userIim
        }
    }
}
