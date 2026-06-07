import { MotionConfig } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import ProductShowcase from './components/sections/ProductShowcase'
import AboutUs from './components/sections/AboutUs'
import Reviews from './components/sections/Reviews'
import ContactInfo from './components/sections/ContactInfo'
import FadeInSection from './components/ui/FadeInSection'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <FadeInSection>
        <AboutUs />
      </FadeInSection>
      <FadeInSection>
        <Reviews />
      </FadeInSection>
      <FadeInSection>
        <ContactInfo />
      </FadeInSection>
      <Footer />
    </MotionConfig>
  )
}
