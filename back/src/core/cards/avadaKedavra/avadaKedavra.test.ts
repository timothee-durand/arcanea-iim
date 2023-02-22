import {describe,beforeEach, expect, it} from 'vitest';
import {Wizard} from "@/core/wizard/Wizard";
import {AvadaKedavra} from "@/core/cards/avadaKedavra/AvadaKedavra";
describe('avada-kedavra', function () {
    let avadaKedavra: AvadaKedavra;
    let defender: Wizard
    beforeEach(() => {
        avadaKedavra = new AvadaKedavra();
        defender = new Wizard('defender');
    })

    it('should inflict 0 damage if health > 15', async () => {
        await avadaKedavra.action({defender});
        expect(defender.health).toBe(100);
    })

    it('should inflict 100 damage if health < 15', async () => {
        defender.health= 10;
        await avadaKedavra.action({defender});
        expect(defender.health).toBe(-90);
    })
});
