import { gql } from '@apollo/client';

export const TASK_ADDED_SUB = gql`
  subscription NewStreamsAdded {
    taskCreated {
      id
      title
      description
    }
  }
`;