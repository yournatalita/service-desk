import { MinLength, IsNumber } from 'class-validator';
import { EditProjectInput } from '../../../graphql.schema';

export class EditProjectDto extends EditProjectInput {
  @IsNumber()
  id: number;
  @MinLength(1, { message: 'Min 1 character' })
  name: string;
  @MinLength(2, { message: 'Min 2 characters' })
  code: string;
}
