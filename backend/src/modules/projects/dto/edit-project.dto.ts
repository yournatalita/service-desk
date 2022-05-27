import { MinLength, IsNumber } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class EditProjectDto {
  @Field(type => ID)
  @IsNumber()
  id: number;
  @Field()
  @MinLength(1, { message: 'Min 1 character' })
  name: string;

  @Field()
  @MinLength(2, { message: 'Min 2 characters' })
  code: string;

  @Field({ nullable: true })
  @MinLength(2, { message: 'Min 2 characters' })
  description?: string;
}
