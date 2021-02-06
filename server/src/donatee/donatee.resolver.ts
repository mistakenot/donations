import {Args, Int, Parent, Query, registerEnumType, ResolveField, Resolver} from '@nestjs/graphql';
import {Donatee, Donation, Repository} from "@shared";

@Resolver(type => Donatee)
export class DonateeResolver {
  constructor(private readonly repository: Repository) {}

  @Query(returns => Donatee)
  async donatee(@Args('regulatedEntityId', { type: () => Int }) regulatedEntityId: number): Promise<Donatee> {
    return await this.repository.getDonatee(regulatedEntityId);
  }

  @Query(returns => [Donatee])
  async donatees(
    @Args('page', { type: () => Int, defaultValue: 0 }) page: number,
    @Args('regulatedDonateeType', { type: () => RegulatedDonateeType, defaultValue: "ecRef" }) regulatedDonateeType: string): Promise<Donatee[]> {
    return await this.repository.listDonatees(page, regulatedDonateeType);
  }

  @ResolveField()
  async donations(@Parent() donatee: Donatee): Promise<Donation[]> {
    const donateeId = donatee.regulatedEntityId;
    return await this.repository.getDonationsByDonateeId(donateeId);
  }
}

enum RegulatedDonateeType {
  ecRef = "ecRef"
}

registerEnumType(RegulatedDonateeType, {
  name: 'RegulatedDonateeType'
})
