import { CallToAction } from '@/components/home/CallToAction'
import { Faqs } from '@/components/home/Faqs'
import { Hero } from '@/components/home/Hero'
import { Pricing } from '@/components/home/Pricing'
import { PrimaryFeatures } from '@/components/home/PrimaryFeatures'
import { Reviews } from '@/components/home/Reviews'
import { SecondaryFeatures } from '@/components/home/SecondaryFeatures'

export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Reviews />
      <Pricing />
      <Faqs />
    </>
  )
}
