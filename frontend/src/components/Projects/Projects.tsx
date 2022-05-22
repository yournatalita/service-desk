import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { ProjectCard } from '@components';

import { useProjects } from './hooks/useProjects';

export const Projects: React.FC = () => {
  const { loading, error, data } = useProjects();

  if (loading || error || !data) return null;

  return (
    <List>
      {data.projects.map((project) => (
        <Item key={project.id}>
          <ProjectCard {...project} />
        </Item>
      ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-flow: wrap;
  margin: 0 ${rem(-6)};
`;

const Item = styled.div`
  display: flex;
  width: calc(100% / 3 - ${rem(12)});
  margin: 0 ${rem(6)} ${rem(16)} ${rem(6)};
`;
