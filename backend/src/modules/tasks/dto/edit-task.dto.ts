import { MinLength, IsNumber } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class EditTaskDto {
  @Field(type => ID)
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @MinLength(1, { message: 'Min 1 character' })
  title: string;

  @Field({ nullable: true })
  @MinLength(1, { message: 'Min 1 character' })
  description?: string;
}
