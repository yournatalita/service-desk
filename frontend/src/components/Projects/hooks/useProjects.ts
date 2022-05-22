import { useQuery } from '@apollo/client';

import { ProjectsList } from '@@types';
import { GET_PROJECTS_ALL } from '@api/queries';

export const useProjects = () => {
  const { loading, error, data } = useQuery<ProjectsList>(GET_PROJECTS_ALL);

  return {
    loading,
    error,
    data,
  };
};
