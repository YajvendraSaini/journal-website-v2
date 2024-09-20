import React from 'react';
import Hero from './Hero';
import FeaturedArticles from './FeaturedArticles';
import SubmitPaper from './SubmitPaper';
import Sidebar from './Sidebar';

function MainContent() {
  return (
    <div className="main-content">
      <div className="content">
        <Hero />
        <FeaturedArticles />
        <SubmitPaper />
      </div>
      <Sidebar />
    </div>
  );
}

export default MainContent;