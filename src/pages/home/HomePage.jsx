import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/category'
import HomePageProductCard from '../../components/homePageProductCard/HomePageProduct'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { Loader } from 'lucide-react'


function HomePage() {
  
  return (
    <Layout>
<HeroSection/>
<Category/>
<HomePageProductCard/>
<Track/>
<Testimonial/>
<Loader/>
    </Layout>
  
    
  )
}

export default HomePage