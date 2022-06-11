import { useQuery } from '@apollo/client';

import { ProjectsList } from '@@types';
import { GET_PROJECTS_ALL_WITH_TASKS_FILTER } from '@api/queries';

export const useProjects = () => {
  const { loading, error, data } = useQuery<ProjectsList>(GET_PROJECTS_ALL_WITH_TASKS_FILTER, {
    variables: {
      filter: {
        statusState: 'open',
      },
    },
  });

  return {
    loading,
    error,
    data,
  };
};
