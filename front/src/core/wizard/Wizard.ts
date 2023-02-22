import {AbstractWizard} from "@/core/wizard/type";
import {AbstractAsyncAction, AbstractCard} from "@/core/base";

export class Wizard implements AbstractWizard {
    name: string
    cards: AbstractCard[] = [];
    draft: AbstractCard[] = [];
    hand: AbstractCard[] = [];
    asyncCard: AbstractAsyncAction[] = [];
    currentCard: AbstractCard | null = null;
    health: number = 100;

    constructor(name: string) {
        this.name = name
    }

    takeDamage(damage: number) {
        this.health -= damage;
    }

    addAsyncAction(asyncAction: AbstractAsyncAction) {
        this.asyncCard.push(asyncAction);
    }

    async executeAsyncAction(attacker: Wizard) {
        const asyncActions = this.asyncCard.map(async asyncAction => {
            await asyncAction.action({defender: this, attacker});
            asyncAction.passTurn()
            if (asyncAction.remainingTurns === 0) {
                this.asyncCard = this.asyncCard.filter(action => action !== asyncAction)
            }
        })
        await Promise.all(asyncActions);
    }
}
