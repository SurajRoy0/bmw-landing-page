"use client"

import HeroSection from "@/components/HeroSection"
import FeaturesSection from "@/components/FeaturesSection"
import NavBar from "@/components/Navbar"
import DrivingDynamics from "@/components/DrivingDynamics"
import Model from "@/components/Model"
import BmwFooter from "@/components/BmwFooter"
import ExperienceAwards from "@/components/bmw-experience/ExperienceAwards"
import ExperienceConfigureCta from "@/components/bmw-experience/ExperienceConfigureCta"
import ExperienceHero from "@/components/bmw-experience/ExperienceHero"
import ExperienceHistory from "@/components/bmw-experience/ExperienceHistory"

const LandingPage = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <DrivingDynamics />
      <FeaturesSection />
      <Model />
      <ExperienceHero />
      <ExperienceAwards />
      <ExperienceHistory />
      <ExperienceConfigureCta />
      <BmwFooter />
    </main>
  )
}

export default LandingPage
