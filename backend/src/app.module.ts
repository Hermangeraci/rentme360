// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [PrismaService, VehicleService],
})
export class AppModule {}
