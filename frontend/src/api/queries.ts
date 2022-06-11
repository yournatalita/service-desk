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

export const GET_PROJECTS_ALL_WITH_TASKS_FILTER = gql`
  query GetProjects($filter: FilterDto) {
    projects {
      name
      id
      code
      accentColor
      description
      tasks(filter: $filter) {
        total
      }
    }
  }
`;
