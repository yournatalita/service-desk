import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { token, PageHeader } from '@ui';

import { Projects } from '@components';

export const Home: React.FC = () => {
  return (
    <Wrapper>
      <PageHeader>Homepage</PageHeader>
      <TasksWrapper>
        <Projects />
      </TasksWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  padding: 0 ${rem(40)};
  background-color: ${token('color.background.default', '')};
`;

const TasksWrapper = styled.div`
  margin: ${rem(20)} 0;
`;
