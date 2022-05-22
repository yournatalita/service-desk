import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AtlassianNavigation, PrimaryButton } from '@ui';
import { Home } from './components';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <AtlassianNavigation
        label={'Header'}
        primaryItems={[
          <PrimaryButton isHighlighted={location.pathname === '/'} onClick={() => navigate('/')}>
            Home
          </PrimaryButton>,
        ]}
        renderProductHome={() => <Home />}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  width: 100%;
`;
