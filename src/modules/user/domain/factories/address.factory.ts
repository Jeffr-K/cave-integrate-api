import { Injectable } from '@nestjs/common';
import { Factory } from '../../../../common/factory.base';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressConcreteFactory extends Factory<Address> {
  create(street: string, county: string, country: string, zipcode: number): Address {
    const address = new Address();
    address.street = street;
    address.county = county;
    address.country = country
    address.zipcode = zipcode;
    return address;
  }
}