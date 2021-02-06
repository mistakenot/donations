import { Module } from '@nestjs/common';
import { DonateeResolver } from './donatee.resolver';

@Module({
  providers: [DonateeResolver]
})
export class DonateeModule {}
