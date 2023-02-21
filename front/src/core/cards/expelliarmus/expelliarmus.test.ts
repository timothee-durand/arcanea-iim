import {describe,beforeEach, expect, it} from 'vitest';
import {Wizard} from "@/core/wizard/Wizard";
import {Expelliarmus} from "@/core/cards/expelliarmus/Expelliarmus";

describe('expelliarmus', function () {
    let expelliarmus: Expelliarmus;
    let defender: Wizard
    beforeEach(() => {
        expelliarmus = new Expelliarmus();
        defender = new Wizard('defender');
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
