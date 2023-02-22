import {INCENDIO} from "../../../../../@types/cardsName";
import {AbstractCard, AttackCard, HistoryAction} from "../../base";

export class Incendio extends AttackCard implements AbstractCard {
    constructor(name :string) {
        super(INCENDIO, name, 10);
    }
}
