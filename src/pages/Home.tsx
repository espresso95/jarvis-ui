import React from 'react';
import SectionOne from '../components/sections/SectionOne';
import SectionTwo from '../components/sections/SectionTwo';

const Home: React.FC = () => {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <SectionOne />

      {/* Section Two - Only visible on mobile */}
      <div className="md:hidden">
        <SectionTwo />
      </div>
    </div>
  );
};

export default Home;
