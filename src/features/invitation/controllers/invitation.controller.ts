import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import * as fs from 'fs';
import { InvitationService } from '../services/invitation.service';
import { Customer } from 'src/types';

@Controller('invitation')
export class InvitationController implements OnModuleInit {
  private customerData: Customer[];

  constructor(private readonly invitationService: InvitationService) {}

  onModuleInit() {
    // Read customer data from the file when the module is initialized
    this.customerData = this.readCustomerDataFromFile();
  }

  /**
   * Read customer data from a file and parse it into an array of objects.
   * @returns An array of objects with id, lat, and long properties.
   */
  private readCustomerDataFromFile(): Customer[] {
    const customerDataRaw: string = fs.readFileSync('customers.txt', 'utf-8');
    const customerDataLines: string[] = customerDataRaw.trim().split('\n');

    return customerDataLines.map((line: string) => {
      const [id, latStr, lonStr]: string[] = line.split(',');
      const [, lat]: string[] = latStr.split(':');
      const [, lon]: string[] = lonStr.split(':');

      return {
        id,
        lat: parseFloat(lat),
        long: parseFloat(lon),
      };
    });
  }

  @Get('send')
  /**
   * Asynchronously processes customers and publishes invited customers.
   *
   * @return {Promise<void>}
   */
  async processCustomers(): Promise<string> {
    const invitedCustomers = this.invitationService.filterCustomersByDistance(
      this.customerData,
    );
    this.invitationService.publishInvitedCustomers(invitedCustomers);
    return 'Data processed. Check console for result.';
  }

  @MessagePattern('invitedCustomers')
  /**
   * Handle invited customers by logging the received invited customers.
   *
   * @param {string[]} invitedCustomers - array of invited customers
   * @return {void}
   */
  handleInvitedCustomers(invitedCustomers: string[]): void {
    console.log('Received invited customers:', invitedCustomers.join(', '));
  }
}
