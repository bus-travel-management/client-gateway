import {
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ITINERARIES_SERVICE } from '../config';
import { ClientKafka } from '@nestjs/microservices';

@Controller('itineraries')
export class ItinerariesController implements OnModuleInit {
  constructor(
    @Inject(ITINERARIES_SERVICE) private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('find_all');
    this.client.subscribeToResponseOf('find_one');

    await this.client.connect();
  }

  @Get('/search')
  getSearchItineraries(
    @Query('city_origin') cityOrigen: string,
    @Query('city_destiny') cityDestiny: string,
  ) {
    return this.client.send('getSearchItineraries', {
      cityOrigen,
      cityDestiny,
    });
  }

  @Post()
  createItineraries() {
    return this.client.send('createItineraries', {});
  }

  @Get()
  getAllItineraries() {
    return this.client.send('find_all', {});
  }

  @Get(':uuid')
  findItineraries(@Param('uuid') uuid: string) {
    return new Promise((resolve, reject) => {
      this.client.send('find_one', { uuid }).subscribe({
        next: (response) => {
          console.log(`Billing user with stripe`);
          resolve(response);
        },
        error: (err) => reject(err),
      });
    });
  }

  @Patch(':uuid')
  async updateItineraries(@Param('uuid') uuid: string) {
    return this.client.send('updateItineraries', { uuid });
  }

  @Delete(':uuid')
  removeItineraries(@Param('uuid') uuid: string) {
    return this.client.send('removeItineraries', { uuid });
  }
}
