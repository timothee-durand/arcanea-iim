import {describe,beforeEach, expect, it} from 'vitest';
import {PetrificusTotalus} from "./PetrificusTotalus";
import {Wizard} from "../../wizard";
import {EXPELLIARMUS} from "../../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('petrificus totalus', function () {
    let expelliarmus: PetrificusTotalus;
    let defender: Wizard
    let attacker: Wizard
    beforeEach(() => {
        expelliarmus = new PetrificusTotalus(EXPELLIARMUS);
        defender = new Wizard('defender', cards, {iimId :'', iimToken : ''});
        attacker = new Wizard('attacker', cards, {iimId :'', iimToken : ''});
    })

    it('should return true', async () => {
        const result = await expelliarmus.action({defender, attacker});
        expect(result.block).toBe(false);
    })

    it('should inflict 5 damages', async () => {
        await expelliarmus.action({defender, attacker});
        expect(defender.health).toBe(95);
    })

    it('should add async action', async () => {
        await expelliarmus.action({defender, attacker});
        expect(defender.asyncCard.length).toBe(1);
    })


    it('should return false when executing async action', async () => {
        await expelliarmus.action({defender, attacker});
        const {block} = await defender.asyncCard[0].action({defender} as { defender: Wizard, attacker: Wizard });
        expect(block).toBe(true);
        expect(defender.asyncCard.length).toBe(1);
    })
});
