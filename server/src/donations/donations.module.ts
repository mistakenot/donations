import { Module } from '@nestjs/common';
import {DonationsResolver} from "./donations.resolver";

@Module({
  providers: [DonationsResolver]
})
export class DonationsModule {}
