import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { logoPlain } from "@/utils";
import { Bs0Circle, BsPlay } from "react-icons/bs";

const navItems = ["Nexus", "About", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement>(null);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <nav className="fixed top-3 z-50 h-12 flex size-full items-center justify-between backdrop-blur-md bg-white/10 px-[10%]">
      <div className="relative">
        <Image
          src={logoPlain}
          alt="logo"
          width={40}
          height={40}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex h-full justify-center items-center gap-4">
        <div className="hidden md:block">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="relative ms-10 font-bold text-xs uppercase text-black cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>

        <button
          style={{
            clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
          }}
          className="bg-black h-full w-[180px] flex items-center justify-center cursor-pointer -mr-7 space-x-2"
        >
          <Bs0Circle className="text-white font-bold text-md" /> <span className="text-white font-medium text-sm">BOOK A CALL</span>
        </button>

        <button
          onClick={toggleAudioIndicator}
          style={{
            clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          className="bg-black h-full w-[60px] flex items-center justify-center cursor-pointer rounded-r-lg"
        >
          <BsPlay className="text-white font-bold text-3xl ml-2" />
        </button>

        <audio
          ref={audioElementRef}
          className="hidden"
          src="/audio/audio.mp3"
          loop
        />
      </div>
    </nav>
  );
};

export default NavBar;
