import React from 'react';
import Hero from '../Hero/Hero';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <div className='home_sections'>
    <Footer />
    </div>
    </>
  );
}

export default Home;
