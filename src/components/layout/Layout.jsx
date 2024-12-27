import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="main-content min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
