import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateStream($createStreamInput: CreateTaskInput) {
    createTask(createTaskInput: $createStreamInput) {
      id
      title
      description
    }
  }
`;
