import { Module } from '@nestjs/common';
import { DonorResolver } from './donor.resolver';

@Module({
  providers: [DonorResolver]
})
export class DonorModule {}
