import * as tacticalConstants from '../constants/tacticalTourFactors';

/**
 * Recursively validates that the input object matches the structure and types of the schema object.
 *
 * @param input The object to validate
 * @param schema The schema object (source of truth)
 * @returns true if input matches schema structure and types
 */
const validateStructure = (input: unknown, schema: unknown): boolean => {
  // If schema is a number, input must be a number, finite, and positive (> 0)
  if (typeof schema === 'number') {
    return typeof input === 'number' && Number.isFinite(input) && input > 0;
  }

  // If schema is an object (and not null), input must be an object
  if (typeof schema === 'object' && schema !== null) {
    if (typeof input !== 'object' || input === null) {
      return false;
    }

    const schemaObj = schema as Record<string, unknown>;
    const inputObj = input as Record<string, unknown>;

    // Check that every key in schema exists in input and validates recursively
    for (const key of Object.keys(schemaObj)) {
      if (!Object.hasOwn(inputObj, key)) {
        return false;
      }

      if (!validateStructure(inputObj[key], schemaObj[key])) {
        return false;
      }
    }
    return true;
  }

  // Fallback for other types (if any are added in the future)
  // For now, we only expect numbers and objects structure
  return true;
};

export const validateConstants = (constants: unknown) => {
  if (!constants || typeof constants !== 'object') {
    return false;
  }

  return validateStructure(constants, tacticalConstants);
};
