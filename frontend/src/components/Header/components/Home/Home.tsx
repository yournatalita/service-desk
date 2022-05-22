import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { Lozenge } from '@ui';

export const Home: React.FC = () => {
  return (
    <HomeWrap>
      ServiceDesk{' '}
      <Lozenge appearance={'new'} isBold={true}>
        Alpha
      </Lozenge>
    </HomeWrap>
  );
};

const HomeWrap = styled.div`
  font-weight: bold;
  margin-right: ${rem(10)};
`;
