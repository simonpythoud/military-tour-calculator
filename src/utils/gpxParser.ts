import type { RoutePoint, RouteSection, GpxRoute, Terrain } from '../types';

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const inferTerrain = (elevationGain: number, distance: number): Terrain => {
  if (distance === 0) return 'FLAT';
  const gradient = elevationGain / (distance * 1000);
  if (gradient > 0.5) return 'TECHNICAL_ALPINE';
  if (gradient > 0.35) return 'ALPINE';
  if (gradient > 0.2) return 'DIFFICULT';
  if (gradient > 0.08) return 'HIKING_TRAIL';
  return 'FLAT';
};

const parseGpxXml = (xmlDoc: Document): RoutePoint[] => {
  const points: RoutePoint[] = [];
  const trkpts = xmlDoc.getElementsByTagName('trkpt');
  const rtepts = xmlDoc.getElementsByTagName('rtept');
  const wpts = trkpts.length > 0 ? trkpts : rtepts;

  for (let i = 0; i < wpts.length; i++) {
    const pt = wpts[i];
    const lat = Number.parseFloat(pt.getAttribute('lat') || '0');
    const lon = Number.parseFloat(pt.getAttribute('lon') || '0');
    const eleNode = pt.getElementsByTagName('ele')[0];
    const ele = eleNode ? Number.parseFloat(eleNode.textContent || '0') : 0;
    points.push({ lat, lon, ele, distanceFromStart: 0 });
  }

  return points;
};

const parseKmlXml = (xmlDoc: Document): RoutePoint[] => {
  const points: RoutePoint[] = [];
  const coordinates = xmlDoc.getElementsByTagName('coordinates');

  for (let i = 0; i < coordinates.length; i++) {
    const text = coordinates[i].textContent || '';
    const coordPairs = text.trim().split(/\s+/);
    for (const pair of coordPairs) {
      const parts = pair.split(',');
      if (parts.length >= 2) {
        const lon = Number.parseFloat(parts[0]);
        const lat = Number.parseFloat(parts[1]);
        const ele = parts.length >= 3 ? Number.parseFloat(parts[2]) : 0;
        if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
          points.push({ lat, lon, ele, distanceFromStart: 0 });
        }
      }
    }
  }

  return points;
};

const parseTcxXml = (xmlDoc: Document): RoutePoint[] => {
  const points: RoutePoint[] = [];
  const trackpoints = xmlDoc.getElementsByTagName('Trackpoint');

  for (let i = 0; i < trackpoints.length; i++) {
    const tp = trackpoints[i];
    const posNode = tp.getElementsByTagName('Position')[0];
    if (!posNode) continue;

    const latNode = posNode.getElementsByTagName('LatitudeDegrees')[0];
    const lonNode = posNode.getElementsByTagName('LongitudeDegrees')[0];
    const eleNode = tp.getElementsByTagName('AltitudeMeters')[0];

    const lat = latNode ? Number.parseFloat(latNode.textContent || '0') : 0;
    const lon = lonNode ? Number.parseFloat(lonNode.textContent || '0') : 0;
    const ele = eleNode ? Number.parseFloat(eleNode.textContent || '0') : 0;

    if (lat !== 0 || lon !== 0) {
      points.push({ lat, lon, ele, distanceFromStart: 0 });
    }
  }

  return points;
};

const computeDistances = (points: RoutePoint[]): void => {
  let cumulative = 0;
  for (let i = 1; i < points.length; i++) {
    cumulative += haversineDistance(
      points[i - 1].lat,
      points[i - 1].lon,
      points[i].lat,
      points[i].lon
    );
    points[i].distanceFromStart = cumulative;
  }
};

const splitIntoSections = (
  points: RoutePoint[],
  targetSectionCount: number
): RouteSection[] => {
  if (points.length < 2) return [];

  const totalDist = points[points.length - 1].distanceFromStart;
  const sectionCount = Math.min(
    targetSectionCount,
    Math.max(1, Math.floor(totalDist / 0.5))
  );
  const sectionLength = totalDist / sectionCount;
  const sections: RouteSection[] = [];

  let sectionStart = 0;
  for (let s = 0; s < sectionCount; s++) {
    const targetEnd = (s + 1) * sectionLength;
    let sectionEnd = sectionStart + 1;

    for (let i = sectionStart + 1; i < points.length; i++) {
      sectionEnd = i;
      if (points[i].distanceFromStart >= targetEnd) break;
    }

    if (s === sectionCount - 1) {
      sectionEnd = points.length - 1;
    }

    const sectionPoints = points.slice(sectionStart, sectionEnd + 1);
    let elevGain = 0;
    let elevLoss = 0;
    for (let i = 1; i < sectionPoints.length; i++) {
      const diff = sectionPoints[i].ele - sectionPoints[i - 1].ele;
      if (diff > 0) elevGain += diff;
      else elevLoss += Math.abs(diff);
    }

    const horizDist =
      sectionPoints[sectionPoints.length - 1].distanceFromStart -
      sectionPoints[0].distanceFromStart;

    sections.push({
      id: `section-${s + 1}`,
      name: `Section ${s + 1}`,
      points: sectionPoints,
      horizontalDistance: Math.round(horizDist * 100) / 100,
      elevationGain: Math.round(elevGain),
      elevationLoss: Math.round(elevLoss),
      terrain: inferTerrain(elevGain, horizDist),
      startIndex: sectionStart,
      endIndex: sectionEnd,
    });

    sectionStart = sectionEnd;
  }

  return sections;
};

const getRouteName = (xmlDoc: Document, _fileType: string): string => {
  let name = 'Imported Route';
  const nameEl = xmlDoc.getElementsByTagName('name')[0];
  if (nameEl?.textContent) {
    name = nameEl.textContent;
  }
  return name.replace(/[<>]/g, '').trim().substring(0, 100);
};

export const parseNavigationFile = (
  content: string,
  fileName: string
): GpxRoute => {
  const parser = new DOMParser();
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  let xmlDoc: Document;
  let points: RoutePoint[];

  if (ext === 'kml') {
    xmlDoc = parser.parseFromString(content, 'text/xml');
    points = parseKmlXml(xmlDoc);
  } else if (ext === 'tcx') {
    xmlDoc = parser.parseFromString(content, 'text/xml');
    points = parseTcxXml(xmlDoc);
  } else {
    xmlDoc = parser.parseFromString(content, 'text/xml');
    points = parseGpxXml(xmlDoc);
  }

  if (points.length === 0) {
    throw new Error('No route points found in file');
  }

  computeDistances(points);

  const targetSections = Math.max(
    1,
    Math.min(20, Math.ceil(points[points.length - 1].distanceFromStart / 2))
  );
  const sections = splitIntoSections(points, targetSections);

  let totalElevGain = 0;
  let totalElevLoss = 0;
  for (const s of sections) {
    totalElevGain += s.elevationGain;
    totalElevLoss += s.elevationLoss;
  }

  return {
    name: getRouteName(xmlDoc, ext),
    points,
    sections,
    totalDistance:
      Math.round(points[points.length - 1].distanceFromStart * 100) / 100,
    totalElevationGain: Math.round(totalElevGain),
    totalElevationLoss: Math.round(totalElevLoss),
  };
};

export const getSupportedExtensions = (): string[] => ['.gpx', '.kml', '.tcx'];

export const isSupportedFile = (fileName: string): boolean => {
  const ext = `.${fileName.split('.').pop()?.toLowerCase()}`;
  return getSupportedExtensions().includes(ext);
};
