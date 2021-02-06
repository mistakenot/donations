import {Args, Int, Parent, Query, registerEnumType, ResolveField, Resolver} from '@nestjs/graphql';
import {Donation, Donor, Repository} from "@shared";

@Resolver(() => Donor)
export class DonorResolver {
  constructor(private readonly repository: Repository) {}

  @Query(returns => Donor)
  async donor(@Args('donorId', { type: () => Int }) donorId: number): Promise<Donor> {
    return this.repository.getDonor(donorId);
  }

  @Query(returns => [Donor])
  async donors(
    @Args('page', { type: () => Int, defaultValue: 0 }) page: number,
    @Args('isCompany', { type: () => Boolean, defaultValue: false }) isCompany: boolean): Promise<Donor[]> {

    return this.repository.listDonors({page, isCompany});
  }

  @ResolveField()
  async donations(@Parent() donor: Donor): Promise<Donation[]> {
    const donorId = donor.donorId;
    return await this.repository.getDonationsByDonorId(donorId);
  }
}
