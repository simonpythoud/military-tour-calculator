import { getFactorMultiplier, calculateTourTime } from '../calculateTime';
import * as standardConstants from '../../constants/standardTourFactors';
import * as tacticalConstants from '../../constants/tacticalTourFactors';
import { Condition, TechnicalSkill, ConditionType, DangerLevel, Experience, Light, Package, Physique, TacticalTerrain, Terrain, ThreatLevel, Weight } from '../../types';

describe('getFactorMultiplier', () => {
    const standardInputs = {
        package: 5 as Package,
        dangerLevel: 'medium' as DangerLevel,
        light: 'day' as Light,
        terrain: 'easy' as Terrain,
        physique: 'medium' as Physique,
        experience: 'medium' as Experience,
        horizontalDistance: 10,
        verticalDistance: 5,
    };

    const tacticalInputs = {
        condition: 'good' as Condition,
        technicalSkill: 'intermediate' as TechnicalSkill,
        weight: 'medium' as Weight,
        tacticalTerrain: 'flat' as TacticalTerrain,
        conditionType: 'summer' as ConditionType,
        threatLevel: 'green' as ThreatLevel,
        horizontalDistance: 10,
        verticalDistance: 5,
    };

    const combinedInputs = {...standardInputs, ...tacticalInputs}

    beforeEach(() => {
        (localStorage.getItem as jest.Mock).mockClear();
        (console.error as jest.Mock).mockClear();
    });

    test('calculates standard multiplier correctly', () => {
        const multiplier = getFactorMultiplier(combinedInputs, false);
        expect(multiplier).toBeGreaterThan(0);
        expect(typeof multiplier).toBe('number');
    });

    test('calculates tactical multiplier correctly', () => {
        const multiplier = getFactorMultiplier(combinedInputs, true);
        expect(multiplier).toBeGreaterThan(0);
        expect(typeof multiplier).toBe('number');
    });
});

describe('calculateTourTime', () => {
    const standardInputs = {
        package: 5 as Package,
        dangerLevel: 'medium' as DangerLevel,
        light: 'day' as Light,
        terrain: 'easy' as Terrain,
        physique: 'medium' as Physique,
        experience: 'medium' as Experience,
        horizontalDistance: 10,
        verticalDistance: 5,
        condition: 'good' as Condition,
        technicalSkill: 'intermediate' as TechnicalSkill,
        weight: 'medium' as Weight,
        tacticalTerrain: 'flat' as TacticalTerrain,
        conditionType: 'summer' as ConditionType,
        threatLevel: 'green' as ThreatLevel,
    };

    beforeEach(() => {
        (localStorage.getItem as jest.Mock).mockClear();
        (console.error as jest.Mock).mockClear();
    });

    test('calculates tour time with valid inputs', () => {
        const result = calculateTourTime(standardInputs, false);

        expect(result).toEqual(expect.objectContaining({
            totalHours: expect.any(Number),
            horizontalHours: expect.any(Number),
            verticalHours: expect.any(Number),
            multiplier: expect.any(Number),
            reliabilityFactor: expect.stringMatching(/^(high|medium|low)$/),
            warnings: expect.any(Array),
        }));
    });

    test('handles invalid constants gracefully', () => {
        (localStorage.getItem as jest.Mock).mockImplementation(() => JSON.stringify({ BASE_SPEEDS: null }));

        const result = calculateTourTime(standardInputs, false);

        expect(result).toEqual({
            totalHours: 0,
            horizontalHours: 0,
            verticalHours: 0,
            multiplier: 1,
            reliabilityFactor: 'low',
            warnings: ['constantsError'],
        });
        expect(console.error).toHaveBeenCalled();
    });

    test('generates appropriate warnings for long tours', () => {
        const longTourInputs = {
            ...standardInputs,
            horizontalDistance: 100,
            verticalDistance: 20,
        };

        const result = calculateTourTime(longTourInputs, false);

        expect(result.warnings).toContain('multiDayTourWarning');
        expect(result.reliabilityFactor).toBe('low');
    });

    test('generates terrain-specific warnings for standard mode', () => {
        const extremeTerrainInputs = {
            ...standardInputs,
            terrain: 'alpine_extreme' as Terrain,
            dangerLevel: 'extreme' as DangerLevel,
        };

        const result = calculateTourTime(extremeTerrainInputs, false);

        expect(result.warnings).toContain('extremeTerrainWarning');
        expect(result.warnings).toContain('highDangerWarning');
    });

    test('generates terrain-specific warnings for tactical mode', () => {
        const tacticalInputs = {
            ...standardInputs,
            threatLevel: 'red' as ThreatLevel,
            tacticalTerrain: 'technical_alpine' as TacticalTerrain,
        };

        const result = calculateTourTime(tacticalInputs, true);

        expect(result.warnings).toContain('highThreatWarning');
        expect(result.warnings).toContain('technicalTerrainWarning');
    });

    test('handles zero distances correctly', () => {
        const zeroDistanceInputs = {
            ...standardInputs,
            horizontalDistance: 0,
            verticalDistance: 0,
        };

        const result = calculateTourTime(zeroDistanceInputs, false);

        expect(result.totalHours).toBe(0);
        expect(result.horizontalHours).toBe(0);
        expect(result.verticalHours).toBe(0);
    });
}); 