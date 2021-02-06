import {Args, Int, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Donatee, Donation, Repository} from "@shared";

@Resolver(type => Donatee)
export class DonateeResolver {
  constructor(private readonly repository: Repository) {}

  @Query(returns => Donatee)
  async donatee(@Args('regulatedEntityId', { type: () => Int }) regulatedEntityId: number): Promise<Donatee> {
    return await this.repository.getDonatee(regulatedEntityId);
  }

  @ResolveField()
  async donations(@Parent() donatee: Donatee): Promise<Donation[]> {
    const donateeId = donatee.regulatedEntityId;
    return await this.repository.getDonationsByDonateeId(donateeId);
  }
}
