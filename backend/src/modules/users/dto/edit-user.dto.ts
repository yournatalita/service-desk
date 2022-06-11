import { IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EditUserDto {
  @Field()
  @IsString({ message: 'No externalId provided' })
  externalId: string;
}
