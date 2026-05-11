import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./common/Button";
import VideoPreview from "./common/VideoPreview";
import Loader from "./common/loader";
import { bmw1, bmw2, bmw3, bmw4, bmw5, bmw6, bmw7, bmw8, bmw9, heroVideo1, heroVideo2, heroVideo3, heroVideo4 } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => {
      console.log('Video loaded, count:', prev + 1); // Debug log
      return prev + 1;
    });
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  console.log(loadedVideos, totalVideos, loading, "loadedVideos");

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVdRef.current?.play();
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    // Create one ScrollTrigger timeline for all animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "center center",
        end: "bottom 10%",
        pinSpacing: true,
        pin: true,
        scrub: 1,
      },
    });

    // Animate video frame from initial to final state
    tl.fromTo("#video-frame",
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        borderRadius: "0px",
      },
      {
        clipPath: "inset(10% 10% 10% 10% round 20px)",
        borderRadius: "20px",
        ease: "power1.inOut",
      },
      0 // Start at time 0
    );

    // Animate content at the same time
    tl.to(".top-hero-content",
      {
        left: "12%",
        bottom: "13%",
        ease: "power1.inOut",
      },
      0 // Start at time 0 (same time as video frame)
    );

    tl.to(".top-hero-heading",
      {
        top: "10%",
        ease: "power1.inOut",
      },
      0 // Start at time 0 (same time as video frame)
    );
  });

  const getVideoSrc = (index: number) => {
    switch (index) {
      case 1:
        return bmw9;
      case 2:
        return bmw7;
      case 3:
        return bmw6;
      case 4:
        return bmw5;
    }
  };

  return (
    <div id="hero-section" className="relative h-dvh w-screen overflow-x-hidden flex justify-center items-center">
      {loading && <Loader />}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] invisible z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="uppercase font-black text-4xl sm:right-10 sm:text-5xl md:text-7xl lg:text-[9rem] absolute bottom-5 right-5 z-40 text-white">
          BMW
        </h1>
        <h1 className="top-hero-heading uppercase absolute top-24 left-5 z-40 font-black text-3xl sm:right-10 sm:text-4xl md:text-6xl lg:text-[7rem] text-white">
          M4 <br /> COMPETITION
        </h1>

        <div className="top-hero-content absolute bottom-5 left-5 z-40 max-w-[800px]">
        <Button
            id="watch-trailer"
            title="Watch trailer"
            leftIcon={<TiLocationArrow className="text-xl mb-[2px]" />}
            containerClass="bg-yellow-300 flex justify-center items-center gap-1 mb-4"
          />
          <p className="text-sm text-white">
            Enter the Metagame Layer Unleash the Play Economy. Enter the Metagame Layer Unleash the Play Economy, Enter the Metagame Layer Unleash the Play Economy.
          </p>
        </div>
      </div>
      <h1 className="top-hero-heading uppercase font-black text-3xl sm:right-10 sm:text-4xl md:text-6xl lg:text-[7rem] absolute top-24 left-5 text-black">
        M4 <br /> COMPETITION
      </h1>
      <h1 className="uppercase font-black text-4xl sm:right-10 sm:text-5xl md:text-7xl lg:text-[9rem] absolute bottom-5 right-5 text-black">
        BMW
      </h1>
    </div>
  );
};

export default HeroSection;
