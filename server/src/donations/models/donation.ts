import {Field, ObjectType, Int} from "@nestjs/graphql";
import {IsNumber} from "class-validator";

@ObjectType()
export class Donation {
  @IsNumber()
  @Field(type => Int)
  readonly id: number;

  constructor({id}: Partial<Donation> = {}) {
    this.id = id;
  }
}
