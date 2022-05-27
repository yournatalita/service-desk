import { MinLength, IsNumber } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskDto {
  @Field()
  @MinLength(1, { message: 'Min 1 character' })
  title: string;

  @Field({ nullable: true })
  @MinLength(1, { message: 'Min 1 character' })
  description?: string;

  @Field()
  @IsNumber()
  projectId: number;
}
