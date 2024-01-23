import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { calculateGreatCircleDistance } from '../helpers/invitation.helper';
import { fintechCoordinates, maxDistance } from '../../../constant';
import { ConfigService } from '@nestjs/config';
import { Customer } from 'src/types';

@Injectable()
export class InvitationService {
  private client: ClientProxy;

  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {ConfigService} configService - The ConfigService for accessing environment variables.
   * @return {}
   */
  constructor(private readonly configService: ConfigService) {
    const USER = this.configService.get('RABBITMQ_USER');
    const PASSWORD = this.configService.get('RABBITMQ_PASS');
    const HOST = this.configService.get('RABBITMQ_HOST');

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        queue: 'invitations',
      },
    });
  }

  /**
   * Process invitation for the given customer.
   * @param customerId - The ID of the customer to send the invitation to.
   * @returns An observable that resolves to void.
   */
  processInvitation(customerId: string): Observable<void> {
    // Send invitation to the customer with the given ID.
    return this.client.send<void, string>('sendInvitation', customerId);
  }

  /**
   * Filter customers within a certain distance from fintechCoordinates
   * @param customers - Array of customers to filter
   * @returns Array of customer IDs within the specified distance
   */
  filterCustomersByDistance(customers: Customer[]): string[] {
    // Initialize array to store invited customer IDs
    const invitedCustomers: string[] = [];

    // Iterate through each customer
    for (const customer of customers) {
      // Calculate distance between fintechCoordinates and customer
      const distance = calculateGreatCircleDistance(
        fintechCoordinates.latitude,
        fintechCoordinates.longitude,
        customer.lat,
        customer.long,
      );

      // If customer is within the specified distance, add to invited customers
      if (distance <= maxDistance) {
        invitedCustomers.push(customer.id);
      }
    }

    return invitedCustomers;
  }

  publishInvitedCustomers(invitedCustomers: string[]): void {
    // console.log(invitedCustomers);
    this.client.emit<string[]>('invitedCustomers', invitedCustomers);
  }
}
