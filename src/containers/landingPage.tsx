"use client"

import { useState } from "react";
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
import Loader from "@/components/common/loader";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {loading && <Loader />}
      <NavBar />
      <HeroSection isParentLoading={loading} onLoaded={() => setLoading(false)} />
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
