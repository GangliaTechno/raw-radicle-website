import React from 'react'
import Experts from './components/Experts.jsx'
import Testimonials from './components/Testimonials.jsx'
import Instagram from './components/Instagram.jsx'
import ShopNow from './components/ShopNow.jsx'
import FAQs from './components/FAQs.jsx'
import { fallbackHome } from './data/home.js'

const homepageSectionsData = {
  experts: fallbackHome.experts,
  testimonials: fallbackHome.testimonials,
  instagram: fallbackHome.instagram,
  shopOn: fallbackHome.shopOn,
  faqs: fallbackHome.faqs,
}

export default function HomepageSections({ data = homepageSectionsData }) {
  const sections = data || homepageSectionsData

  return (
    <>
      <Experts experts={sections.experts || homepageSectionsData.experts} title="Meet the Experts Behind Raw Radicles" />
      <Testimonials videos={sections.testimonials?.videos || homepageSectionsData.testimonials.videos} title="Testimonials" />
      <Instagram instagram={sections.instagram || homepageSectionsData.instagram} title="RAW RADICLES on Instagram" />
      <ShopNow shopOn={sections.shopOn || homepageSectionsData.shopOn} />
      <FAQs faqs={sections.faqs || homepageSectionsData.faqs} />
    </>
  )
}
