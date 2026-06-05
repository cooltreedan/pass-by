import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { HowItWorks } from '@/components/HowItWorks'
import { RequestForm } from '@/components/RequestForm'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <RequestForm />
      </main>
      <Footer />
    </>
  )
}
