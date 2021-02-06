import {Args, Int, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Donation, Donor, Repository} from "@shared";

@Resolver(() => Donor)
export class DonorResolver {
  constructor(private readonly repository: Repository) {}

  @Query(returns => Donor)
  async donor(@Args('donorId', { type: () => Int }) donorId: number): Promise<Donor> {
    return this.repository.getDonor(donorId);
  }

  @ResolveField()
  async donations(@Parent() donor: Donor): Promise<Donation[]> {
    const donorId = donor.donorId;
    return await this.repository.getDonationsByDonorId(donorId);
  }
}
