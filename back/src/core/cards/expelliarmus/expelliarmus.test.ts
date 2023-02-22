import {describe,beforeEach, expect, it} from 'vitest';
import {Expelliarmus} from "./Expelliarmus";
import {Wizard} from "../../wizard";
import {EXPELLIARMUS} from "../../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('expelliarmus', function () {
    let expelliarmus: Expelliarmus;
    let defender: Wizard
    beforeEach(() => {
        expelliarmus = new Expelliarmus(EXPELLIARMUS);
        defender = new Wizard('defender', cards);
    })

    it('should return true', async () => {
        const result = await expelliarmus.action({defender});
        expect(result).toBe(true);
    })

    it('should add async action', async () => {
        await expelliarmus.action({defender});
        expect(defender.asyncCard.length).toBe(1);
    })


    it('should return false when executing async action', async () => {
        await expelliarmus.action({defender});
        await defender.asyncCard[0].action({defender} as { defender: Wizard, attacker: Wizard });
        expect(defender.asyncCard.length).toBe(1);
    })
});
