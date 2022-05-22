import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { token, PageHeader } from '@ui';
import { Tasks } from '@components';

export const Main: React.FC = () => {
  return (
    <Wrapper>
      <PageHeader>Issues & Requests</PageHeader>
      <TasksWrapper>
        <Tasks />
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
