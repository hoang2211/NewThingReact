import { Faqs } from '@/components/home/Faqs'

import Incentives from '@/components/home/Incentives'

import { PrimaryFeatures } from '@/components/home/PrimaryFeatures'
import { Reviews } from '@/components/home/Reviews'

import StoreFront from '@/components/home/StoreFront'

export default function Home() {
  return (
    <>
      <StoreFront />
      {/* <Hero /> */}
      <PrimaryFeatures />
      {/* <SecondaryFeatures /> */}
      {/* <CallToAction /> */}
      <Reviews />

      <Incentives />

      <Faqs />
    </>
  )
}
