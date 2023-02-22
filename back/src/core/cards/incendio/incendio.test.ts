import {describe,beforeEach, expect, it} from 'vitest';
import {Incendio} from "./Incendio";
import {Wizard} from "../../wizard";

describe('incendio', function () {
    let incendio: Incendio;
    let defender: Wizard
    beforeEach(() => {
        incendio = new Incendio();
        defender = new Wizard('defender');
    })

    it('should inflict 10 damage', async () => {
        await incendio.action({defender});
        expect(defender.health).toBe(90);
    })
});
