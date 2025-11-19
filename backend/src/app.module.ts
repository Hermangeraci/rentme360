// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [],
  controllers: [VehicleController, CustomerController],
  providers: [PrismaService, VehicleService, CustomerService],
})
export class AppModule {}
