# Military Tour Time Calculator

A web-based calculator for estimating military march durations, taking into account various terrain and condition factors.

## Features

- Calculate total march time based on:
  - Horizontal distance (km)
  - Vertical distance (m)
  - Package/equipment weight (0-30kg)
  - Danger level conditions
  - Light conditions
  - Terrain type
  - Physical condition
  - Experience level
- Multilingual support (English, German, French, Italian, Romansh)
- Detailed breakdown of horizontal and vertical times
- Real-time calculations
- Mobile-responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/simonpythoud/military-tour-calculator.git
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```


The application will be available at [http://localhost:3000](http://localhost:3000)

## Calculation Method

The calculator uses the following base parameters:
- Base horizontal speed: 4 km/h
- Base vertical speed: 400 m/h

These base speeds are then modified by various factors:
- Package weight: Each 5kg reduces speed by 2%
- Danger level: Affects speed from 100% (low) to 50% (extreme)
- Light conditions: Day (100%), Mixed (80%), Night (60%)
- Terrain type: From easy (100%) to alpine extreme (40%)
- Physical condition: From very fit (120%) to injured (30%)
- Experience level: From expert (120%) to none (60%)

Note: The calculation of cumulative fatigue over time is not currently part of this application. This feature may be developed in the future based on military requirements and user needs.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Icons

## Acknowledgments

- This project was inspired by the need to estimate military march times in the field.
- Thanks to [@simonpythoud](https://github.com/simonpythoud) for the initial implementation.
- Thanks to Ivo for the request to develop this as part of the toolset used by the swiss mountain specialist.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Deployment

The application is deployed at [https://simonpythoud.github.io/military-tour-calculator](https://simonpythoud.github.io/military-tour-calculator)

