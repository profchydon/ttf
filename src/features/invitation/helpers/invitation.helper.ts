/**
 * Calculate the great-circle distance between two points on the Earth's surface
 * using the Haversine formula.
 * @param lat1 - The latitude of the first point
 * @param lon1 - The longitude of the first point
 * @param lat2 - The latitude of the second point
 * @param lon2 - The longitude of the second point
 * @returns The great-circle distance in kilometers
 */
export const calculateGreatCircleDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const earthRadius = 6371;
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

/**
 * Convert degrees to radians.
 * @param degrees - The angle in degrees
 * @returns The angle in radians
 */
export const toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};
