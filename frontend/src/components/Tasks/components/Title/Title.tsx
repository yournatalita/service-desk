import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'react-router-dom';

import { Task } from '@@types';
import { token } from '@ui';

type TitleProps = Pick<Task, 'title' | 'id'> & {};

export const Title: React.FC<TitleProps> = ({ id, title }) => {
  return (
    <Wrapper>
      <LinkStyled to={`${id}`}>
        <TaskId>#{id}</TaskId> {title}
      </LinkStyled>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${rem(8)} ${rem(3)};
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${token('color.text.link.resting')};
  
  &:hover {
    color: ${token('color.text.link.pressed')};
  }
`

const TaskId = styled.span`
  font-weight: bold;
`;
