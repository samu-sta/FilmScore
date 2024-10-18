import React from 'react';
import '../../public/styles/pages/Index.css';
import { Link } from 'react-router-dom';

const Index = () => {

  return (
    <main className='index-main'>
      <h1 className='index-title'>Welcome to FilmScore</h1>
      <section className='index-buttons-section'>
        <Link to='/login' className='index-principal-button'>Log in</Link>
        <Link to='/register' className='index-button'>Sign up</Link>
      </section>
    </main>
  );
};

export default Index;