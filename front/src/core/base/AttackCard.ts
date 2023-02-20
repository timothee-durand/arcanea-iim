import {BaseCard} from "@/core/base/BaseCard";

export class AttackCard extends BaseCard {
    private damage: number;

    constructor(key:string, title:string, damage:number) {
        super(key, title);
        this.damage = damage;
    }

    async action(): Promise<boolean>{
        throw new Error("Action not implemented")
    }
}
