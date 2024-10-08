import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ITINERARIES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: envs.kafkaServers,
          },
          consumer: {
            groupId: `itineraries`,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
