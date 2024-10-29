import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'

const Home = () => {
  return (
    <div>
      <Hero  />
      <SearchBar />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home