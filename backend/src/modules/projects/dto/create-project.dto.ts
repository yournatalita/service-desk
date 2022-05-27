import { MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectDto {
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
