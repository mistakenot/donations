import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {Donatee, Donation, Donor, Repository} from "@shared";

@Resolver(of => Donation)
export class DonationsResolver {
  constructor(private readonly repository: Repository) {}

  @Query(returns => Donation)
  async donation(@Args('ecRef', { type: () => String }) ecRef: string): Promise<Donation> {
    return await this.repository.getDonation(ecRef);
  }

  @ResolveField()
  async donor(@Parent() donation: Donation): Promise<Donor> {
    const id = donation.donorId;
    return await this.repository.getDonor(id);
  }

  @ResolveField()
  async donatee(@Parent() donation: Donation): Promise<Donatee> {
    const id = donation.regulatedEntityId;
    return await this.repository.getDonatee(id);
  }
}
