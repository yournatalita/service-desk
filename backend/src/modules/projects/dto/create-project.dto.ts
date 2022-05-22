import { MinLength } from 'class-validator';
import { CreateProjectInput } from '../../../graphql.schema';

export class CreateProjectDto extends CreateProjectInput {
  @MinLength(1, { message: 'Min 1 character' })
  name: string;
  @MinLength(2, { message: 'Min 2 characters' })
  code: string;
}
