import {Field, ObjectType} from "@nestjs/graphql";
import {IsString} from "class-validator";
import {Donation} from "./donation";

@ObjectType()
export class Donatee {

  @IsString()
  @Field(type => String)
  readonly regulatedEntityId: string;

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
