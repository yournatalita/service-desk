import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($filter: FilterDto!) {
    tasks(filter: $filter) {
      list {
        id
        title
        description
        onCreated
        onUpdated
      }
      total
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: Int!) {
    task(id: $id) {
      id
      title
      description
    }
  }
`;

export const GET_PROJECTS_ALL = gql`
  query GetProjects {
    projects {
      name
      id
      code
      accentColor
      description
      tasks {
        total
      }
    }
  }
`;
