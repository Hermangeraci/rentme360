// backend/src/vehicle.controller.ts
import { Controller, Get } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll() {
    // Restituisce l'elenco dei veicoli
    return this.vehicleService.findAll();
  }
}
