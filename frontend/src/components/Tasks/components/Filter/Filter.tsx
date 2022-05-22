import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

export const Filter: React.FC = () => {
  return (
    <FilterWrapper>
      Filter
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  margin: ${rem(20)} 0;
`;