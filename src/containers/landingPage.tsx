"use client"

import HeroSection from "@/components/HeroSection"
import FeaturesSection from "@/components/FeaturesSection"
import NavBar from "@/components/Navbar"
import DrivingDynamics from "@/components/DrivingDynamics"
import Highlights from "@/components/HighLights"
import Model from "@/components/Model"
import BmwExperience from "@/components/BmwExperience"
import BmwFooter from "@/components/BmwFooter"

const LandingPage = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <DrivingDynamics />
      <Highlights />
      <Model />
      <BmwExperience />
      <BmwFooter />
    </main>
  )
}

export default LandingPage
