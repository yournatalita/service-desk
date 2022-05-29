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
  tasks,
}) => {
  return (
    <Wrapper to={`/projects/${code}`}>
      <Inner>
        <Title>
          <Color accentColor={accentColor} />
          <Text>
            <span>{name}</span>
            <Description>{description}</Description>
          </Text>
        </Title>
        <Meta>
          <MetaTitle>Quick links</MetaTitle>
          <MetaLink to={`/projects/${code}?filter=open`}>
            Open issues <Issues>{tasks.total}</Issues>
          </MetaLink>
        </Meta>
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
  width: 100%;
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

const Meta = styled.div`
  display: flex;
  flex-flow: column;
`;

const MetaTitle = styled.h6`
  font-size: ${rem(12)};
  text-transform: uppercase;
  color: ${token('color.text.subtle')};
  margin: ${rem(10)} 0 ${rem(6)} 0;
`;

const MetaLink = styled(Link)`
  display: inline-flex;
  justify-content: space-between;
  width: calc(100% + ${rem(8)});
  text-decoration: none;
  color: ${token('color.text')};
  font-size: ${rem(12)};
  padding: ${rem(4)};
  border-radius: ${rem(4)};
  margin: 0 ${rem(-4)};

  &:hover {
    background: ${token('color.background.subtleNeutral.resting')};
  }
`;

const Issues = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${rem(1)} ${rem(4)};
  line-height: 1;
  border-radius: 20%;
  min-width: ${rem(20)};

  background: ${token('color.background.subtleNeutral.hover')};
`;
