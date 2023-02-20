import {AbstractWizard} from "@/core/wizard/type";
import {AbstractCard, AsyncAction} from "@/core/base";

export class Wizard implements AbstractWizard{
    name: string
    cards: AbstractCard[] = [];
    draft: AbstractCard[] = [];
    hand: AbstractCard[] = [];
    asyncCard: AsyncAction[] = [];
    currentCard: AbstractCard | null = null;
    health: number = 100;

    constructor(name: string) {
        this.name = name
    }

    takeDamage(damage: number) {
        this.health -= damage;
    }

    addAsyncAction(asyncAction: AsyncAction) {
        this.asyncCard.push(asyncAction);
    }
}
