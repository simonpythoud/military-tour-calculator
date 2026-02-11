import { describe, it, expect } from 'vitest';
import { validateConstants } from './manageConstants';
import * as tacticalConstants from '../constants/tacticalTourFactors';

describe('validateConstants', () => {
  it('should validate correct constants', () => {
    // Clone tacticalConstants to simulate valid input
    const validConstants = JSON.parse(JSON.stringify(tacticalConstants));
    expect(validateConstants(validConstants)).toBe(true);
  });

  it('should invalidate empty object', () => {
    expect(validateConstants({})).toBe(false);
  });

  it('should invalidate null', () => {
    expect(validateConstants(null)).toBe(false);
  });

  it('should invalidate undefined', () => {
    expect(validateConstants(undefined)).toBe(false);
  });

  it('should invalidate missing top-level key', () => {
    const invalidConstants = JSON.parse(JSON.stringify(tacticalConstants));
    delete invalidConstants.BASE_SPEEDS;
    expect(validateConstants(invalidConstants)).toBe(false);
  });

  it('should invalidate missing nested key', () => {
    const invalidConstants = JSON.parse(JSON.stringify(tacticalConstants));
    delete invalidConstants.BASE_SPEEDS.HORIZONTAL;
    expect(validateConstants(invalidConstants)).toBe(false);
  });

  it('should invalidate wrong type for number value', () => {
    const invalidConstants = JSON.parse(JSON.stringify(tacticalConstants));
    invalidConstants.BASE_SPEEDS.HORIZONTAL = "not a number";
    expect(validateConstants(invalidConstants)).toBe(false);
  });

  it('should invalidate wrong type for nested object', () => {
    const invalidConstants = JSON.parse(JSON.stringify(tacticalConstants));
    invalidConstants.BASE_SPEEDS = "not an object";
    expect(validateConstants(invalidConstants)).toBe(false);
  });

  it('should validate with extra keys (lenient check for extra keys, strict for required)', () => {
    const constantsWithExtra = JSON.parse(JSON.stringify(tacticalConstants));
    constantsWithExtra.EXTRA_KEY = "something";
    expect(validateConstants(constantsWithExtra)).toBe(true);
  });
});
