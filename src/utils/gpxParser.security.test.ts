import { describe, it, expect } from 'vitest';
import { parseNavigationFile } from './gpxParser';
import { MAX_VERTICAL_DISTANCE } from '../constants/limits';

describe('gpxParser Security', () => {
  it('should reject GPX files exceeding MAX_HORIZONTAL_DISTANCE', () => {
    // Create a GPX file with two points extremely far apart
    // (0,0) to (0, 10) is ~1110 km > 1000 km
    const maliciousGpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Malicious User">
  <trk>
    <trkseg>
      <trkpt lat="0" lon="0"></trkpt>
      <trkpt lat="10" lon="0"></trkpt>
    </trkseg>
  </trk>
</gpx>`;

    expect(() => parseNavigationFile(maliciousGpx, 'malicious.gpx')).toThrow(
      /Route distance.*exceeds maximum allowed/
    );
  });

  it('should reject GPX files exceeding MAX_VERTICAL_DISTANCE', () => {
    // Create a GPX file with huge elevation gain
    const maliciousGpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Malicious User">
  <trk>
    <trkseg>
      <trkpt lat="0" lon="0"><ele>0</ele></trkpt>
      <trkpt lat="0.001" lon="0"><ele>${MAX_VERTICAL_DISTANCE + 1000}</ele></trkpt>
    </trkseg>
  </trk>
</gpx>`;

    expect(() => parseNavigationFile(maliciousGpx, 'malicious.gpx')).toThrow(
      /Route elevation gain.*exceeds maximum allowed/
    );
  });
});
