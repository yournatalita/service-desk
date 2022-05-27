import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'react-router-dom';

import { token } from '@ui';
import { Project } from '@@types';

type ProjectCardProps = Project & {};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  code,
  name,
  description,
  accentColor,
}) => {
  return (
    <Wrapper to={`/${code}`}>
      <Inner>
        <Title>
          <Color accentColor={accentColor} />
          <Text>
            <span>{name}</span>
            <Description>{description}</Description>
          </Text>
        </Title>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  position: relative;
  cursor: pointer;
  text-decoration: none;
  max-width: 100%;
  width: 100%;
  display: flex;
  background-color: ${token('elevation.surface', 'white')};
  min-height: ${rem(168)};
  border-radius: 1.5px;
  border: 2px solid transparent;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: ${token('elevation.shadow.raised')};

  &:hover {
    background-color: ${token('elevation.surface.raised', 'white')};
    box-shadow: ${token('elevation.shadow.overflow')};
  }
`;

const Inner = styled.div`
  padding: ${rem(16)};
`;

const Title = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: ${rem(14)};
  font-style: inherit;
  color: ${token('color.text')};
  white-space: nowrap;
  font-weight: 500;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

type ColorStyleProps = {
  accentColor?: string;
};

const Color = styled.div<ColorStyleProps>`
  width: ${rem(25)};
  height: ${rem(25)};
  border-radius: ${rem(6)};
  margin-right: ${rem(6)};
  background-color: ${({ accentColor }) => accentColor};
`;

const Text = styled.div`
  display: flex;
  flex-flow: column;
`;

const Description = styled.span`
  display: inline-flex;
  align-items: center;
  margin-top: ${rem(3)};
  font-size: ${rem(12)};
  font-weight: 400;
  color: ${token('color.text.subtle')};
`;
