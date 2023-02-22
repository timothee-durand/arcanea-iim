import {STUPEFIX} from "../../../../../@types/cardsName";
import {AbstractCard, AttackCard} from "../../base";

export class Stupefix extends AttackCard implements AbstractCard {
    constructor(name :string) {
        super(STUPEFIX, name, 10);
    }
}
