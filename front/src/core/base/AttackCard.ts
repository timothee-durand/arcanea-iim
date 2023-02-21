import {BaseCard} from "@/core/base/BaseCard";
import {Wizard} from "@/core/wizard/Wizard";

export class AttackCard extends BaseCard {
    private readonly damage: number;

    constructor(key:string, title:string, damage:number) {
        super(key, title);
        this.damage = damage;
    }

    async action({defender} : {defender: Wizard}): Promise<boolean> {
        defender.takeDamage(this.damage);
        return true;
    }
}
