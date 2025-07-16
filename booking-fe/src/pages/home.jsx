import React from 'react';
import WhyChooseUs from '../components/home/whychooseus.jsx';
import HowToBook from '../components/home/howtobook';
import Hero from '../components/home/hero';
import NearbyService from '../components/services/NearbyServices'; 
import QuickPurpose from '../components/home/quickpurpose';
import RandomServiceSuggestion from '../components/home/RandomServiceSuggestion';
import Testimonials from '../components/home/testimonials';
import SearchBar from '../components/home/searchbar';

export default function Home() {
  return (
    <div className="container mt-4">
      <Hero />
      <SearchBar /> 
      <QuickPurpose />
      <RandomServiceSuggestion />    
      <NearbyService />
      <WhyChooseUs />
      <Testimonials />       
      <HowToBook />
    </div>
  );
}
