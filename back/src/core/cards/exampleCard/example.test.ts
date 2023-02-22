import {describe,beforeEach, expect, it} from 'vitest';
import {ExampleCard} from "./ExampleCard";
import {Wizard} from "../../wizard";
import {cards} from "../../../cards";

describe('exemple', function () {
    let exampleCard: ExampleCard;
    let defender: Wizard
    beforeEach(() => {
        exampleCard = new ExampleCard();
        defender = new Wizard('defender', cards);
    })
    it('should return false', async () => {
        const result = await exampleCard.action({defender});
        expect(result).toBe(false);
    })
});
