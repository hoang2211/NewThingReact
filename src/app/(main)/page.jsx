import { CallToAction } from '@/components/home/CallToAction'
import { Faqs } from '@/components/home/Faqs'
import { Hero } from '@/components/home/Hero'
import Incentives from '@/components/home/Incentives'
import { Pricing } from '@/components/home/Pricing'
import { PrimaryFeatures } from '@/components/home/PrimaryFeatures'
import { Reviews } from '@/components/home/Reviews'
import { SecondaryFeatures } from '@/components/home/SecondaryFeatures'
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
      <Pricing />
      <Faqs />
    </>
  )
}
