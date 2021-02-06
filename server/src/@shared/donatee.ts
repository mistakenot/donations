import {Field, ObjectType, Int} from "@nestjs/graphql";
import {IsInt, IsString} from "class-validator";
import {Donation} from "./donation";

@ObjectType()
export class Donatee {

  @IsInt()
  @Field(type => Int)
  readonly regulatedEntityId: number;

  @IsString()
  @Field(type => String)
  readonly regulatedEntityName: string;

  @IsString()
  @Field(type => String)
  readonly regulatedEntityType: string;

  @IsString()
  @Field(type => String)
  readonly regulatedDoneeType: string;

  @Field(type => [Donation])
  readonly donations: Donation[];
}
