import { fintechCoordinates, maxDistance } from 'src/constant';
import { Customer } from 'src/types';

export const calculateGreatCircleDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

export const filterCustomersByDistance = (customers: Customer[]): string[] => {
  const invitedCustomers: string[] = [];

  for (const customer of customers) {
    const distance = calculateGreatCircleDistance(
      fintechCoordinates.latitude,
      fintechCoordinates.longitude,
      customer.lat,
      customer.long,
    );

    if (distance <= maxDistance) {
      invitedCustomers.push(customer.id);
    }
  }

  return invitedCustomers;
};
