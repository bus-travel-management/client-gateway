import { Module } from '@nestjs/common';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { KafkaModule } from './transport/kafka.module';

@Module({
  imports: [ItinerariesModule, KafkaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
