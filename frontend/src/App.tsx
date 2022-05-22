import React from 'react';
import { Header, Home, Main, Sidebar } from '@components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLayout, TopNavigation, Content, Main as MainComponent } from '@ui';

function App() {
  return (
    <Router>
      <PageLayout>
        <TopNavigation
          isFixed={true}
          id="confluence-navigation"
          skipLinkTitle="Confluence Navigation">
          <Header />
        </TopNavigation>
        <Content>
          <Sidebar />
          <MainComponent id="main-content" skipLinkTitle="Main Content">
            <Routes>
              <Route path={'/issues'} element={<Main />} />
              <Route index element={<Home />} />
            </Routes>
          </MainComponent>
        </Content>
      </PageLayout>
    </Router>
  );
}

export default App;
