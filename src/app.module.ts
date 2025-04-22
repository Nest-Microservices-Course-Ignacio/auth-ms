import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NatsClientModule } from './transports/nats-client.module';

@Module({
  imports: [AuthModule, NatsClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
