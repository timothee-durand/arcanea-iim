import {describe,beforeEach, expect, it} from 'vitest';
import {Wizard} from "@/core/wizard/Wizard";
import {ExampleCard} from "@/core/cards/exampleCard/ExampleCard";
describe('exemple', function () {
    let exampleCard: ExampleCard;
    let defender: Wizard
    beforeEach(() => {
        exampleCard = new ExampleCard();
        defender = new Wizard('defender');
    })
    it('should return false', async () => {
        const result = await exampleCard.action({defender});
        expect(result).toBe(false);
    })
});
