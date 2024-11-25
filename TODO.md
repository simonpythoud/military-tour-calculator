# TODO List for Military Tour Calculator

## High Priority

### Modify and upload new constants
- [ ] Allow uploading new constants as JSON file
- [ ] Validate constants file
- [ ] Enable toggle between default and custom constants
- [ ] Allow to edit constants in the app

### Break Calculation Feature
- [ ] Add automatic break calculations based on:
  - Tour duration (short breaks every hour, longer breaks every 4 hours)
  - Terrain difficulty (more frequent breaks in difficult terrain)
  - Package weight (heavier loads require more frequent breaks)
  - Physical condition (adjust break frequency based on fitness level)
- [ ] Display recommended breaks in the results section
- [ ] Add break time to total tour duration
- [ ] Allow customization of break parameters
- [ ] Include meal breaks for tours > 6 hours

### Break Implementation Details 

```
typescript
interface Break {
startTime: number; // Hours from start
duration: number; // Minutes
type: 'short' | 'long' | 'meal';
reason: string; // Why this break is recommended
isOptional: boolean; // Whether the break is mandatory or optional
}
```

## Medium Priority

- [ ] Use measured factors from real tours
- [ ] Weather conditions integration
- [ ] Group size factor
- [ ] Night navigation time penalties
- [ ] Alternative routes suggestion
- [ ] Publish the app in the app store

## Low Priority

- [ ] GPS track import
- [ ] Offline mode improvements
- [ ] Multi-day tour planning
- [ ] Print-friendly output
- [ ] Mobile app version

## Completed
- [x] Basic tour calculation
- [x] Multiple language support
- [x] Performance graph
- [x] Save/load calculations
- [x] Adapt the factor system to the information provided by the chef
- [x] Seasonal adjustments
