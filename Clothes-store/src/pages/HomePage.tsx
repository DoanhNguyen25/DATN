import React from 'react'
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Sale from '../components/Sale';
import Slider from '../components/Slider';
import MainLayout from '../layouts/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <Slider/>
      <Categories/>
      <Sale/>
      <Products/>
      <Newsletter/>
    </MainLayout>
  )
}

export default HomePage;