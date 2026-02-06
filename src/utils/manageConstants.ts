import type { Constants } from '../types';

// const handleConstantsUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const constants = JSON.parse(e.target?.result as string);
//           localStorage.setItem('customConstants', JSON.stringify(constants));
//           window.location.reload(); // Reload to apply new constants
//         } catch (error) {
//           console.error('Error parsing constants file:', error);
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

export const validateConstants = (constants: any) => {
  const requiredKeys: Array<keyof Constants> = [
    'BASE_SPEEDS',
    'CONDITION_FACTORS',
    'TECHNICAL_SKILL_FACTORS',
    'WEIGHT_FACTORS',
    'TACTICAL_TERRAIN_FACTORS',
    'CONDITION_TYPE_FACTORS',
    'THREAT_LEVEL_FACTORS',
  ];

  return requiredKeys.every(
    (key) => Object.hasOwn(constants, key) && typeof constants[key] === 'object'
  );
};
