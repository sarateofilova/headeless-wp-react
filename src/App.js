import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Route as RoutedRoute } from 'react-router-dom';
import axios from 'axios';

import GetCurrentPageId from "./_includes/GetCurrentPageId";
import ACFRenderSingleComponent from "./_includes/ACFRenderSingleComponent";
import ACFRenderFlexibleContent from './_includes/ACFRenderFlexibleContent';
import SinglePage from './templates/SinglePage';
import ComponentHeader from "./components/ComponentHeader/ComponentHeader";
import PageArchive from "./templates/PageArchive";

function App() {

  const [homepageId, setHomepageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const response = await axios.get('http://headless-wp.test/wp-json/wp/v2/pages');
      const homepage = response.data.find(page => page.slug === 'home');

      if (homepage) {
        setHomepageId(homepage.id);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
      <Router>
        <ComponentHeader />
        <Routes>
          // Show single page (detail page)
          <RoutedRoute path="/page/:slug" element={<SinglePage />} />
          // Show overview pages
          <RoutedRoute path="/pages" element={<PageArchive />} />
          // Homepage
          <RoutedRoute path="/" element={
            <>
              <ACFRenderSingleComponent pageId={homepageId} componentName={'component_hero'} />
              <ACFRenderFlexibleContent pageId={homepageId} />
            </>
          } />

          {/*<RoutedRoute path="acf/:id"*/}
          {/*             element={<GetCurrentPageId>*/}
          {/*               {(currentPageId) => <ACFRenderFlexibleContent pageId={currentPageId} />}*/}
          {/*             </GetCurrentPageId>}/>*/}
        </Routes>
      </Router>
  );
}
export default App;