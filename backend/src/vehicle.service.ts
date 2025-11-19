// backend/src/vehicle.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    // Restituisce tutti i veicoli dal database (quando sarà collegato)
    return this.prisma.vehicle.findMany({
      orderBy: { id: 'desc' },
    });
  }
}
