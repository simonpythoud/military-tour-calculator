export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const SUPPORTED_EXTENSIONS = ['.gpx', '.kml', '.tcx'];

// Input limits to prevent DoS (infinite loops in calculation)
export const MAX_HORIZONTAL_DISTANCE = 1000; // 1000 km
export const MAX_VERTICAL_DISTANCE = 100000; // 100,000 m
