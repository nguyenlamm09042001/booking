import React from 'react';
import WhyChooseUs from '../components/home/whychooseus.jsx';
import HowToBook from '../components/home/howtobook';
import Hero from '../components/home/hero';
import Service from '../components/services/servicelist'; 
import QuickPurpose from '../components/home/quickpurpose';
import ServiceCategories from '../components/home/servicecategories';
import Testimonials from '../components/home/testimonials';
import SearchBar from '../components/home/searchbar';

export default function Home() {
  return (
    <div className="container mt-4">
      <Hero />
      <SearchBar /> 
      <QuickPurpose />
      <ServiceCategories />    
      <Service />
      <WhyChooseUs />
      <Testimonials />       
      <HowToBook />
    </div>
  );
}
