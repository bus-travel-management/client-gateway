import { Module } from '@nestjs/common';
import { ItinerariesController } from './itineraries.controller';
import { KafkaModule } from '../transport/kafka.module';

@Module({
  controllers: [ItinerariesController],
  providers: [],
  imports: [KafkaModule],
})
export class ItinerariesModule {}
