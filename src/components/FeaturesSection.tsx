import { bmw1, bmw2, bmw3, bmw4 } from "@/utils";
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./common/Button";
import { BentoTilt } from "./common/BentoTilt";

export const BentoCard = ({
  src,
  title,
  description,
  isComingSoon,
  ctaLabel = "Learn more",
}: {
  src: string;
  title: React.ReactNode;
  description: string;
  isComingSoon: boolean;
  ctaLabel?: string;
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50 gap-10">
        <div>
          <h1 className="font-circular-web text-2xl md:text-4xl font-black uppercase">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-sm">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative flex w-fit cursor-pointer items-center gap-1.5 overflow-hidden rounded-full bg-black/70 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/15 hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.4)] px-5 py-2 text-xs uppercase text-white/30 hover:text-white/80 transition-all duration-300"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">{ctaLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FeaturesSection = () => (
  <section id="features" className="bg-black mx-auto px-10 md:px-[10%] py-32">
    <div className="px-5">
      <p className="font-circular-web text-lg text-blue-50">
        BMW M4 · Competition DNA
      </p>
      <p className="max-w-md font-circular-web text-md text-blue-50 opacity-50">
        From the S58 straight-six to M xDrive and Competition tuning, every
        system is built for precision, feedback, and the kind of throttle response
        that turns commutes into hot laps.
      </p>
      <Button
        id="m4-highlights"
        title="See highlights"
        leftIcon={<TiLocationArrow className="text-xl mb-[1px]" />}
        variant="primary"
        containerClass="mt-7"
      />
    </div>

    <div className="grid w-full grid-cols-2 grid-rows-3 gap-7 mt-20">
      <BentoTilt className="col-span-2 row-span-1 h-full min-h-0 md:row-span-2">
        <BentoCard
          src={bmw1}
          title={
            <>
              S58 <b>S</b>ix
            </>
          }
          description="Twin-scroll turbochargers, 503 hp, and a soundtrack tuned for the redline—M’s inline-six at its sharpest."
          isComingSoon
          ctaLabel="Powertrain"
        />
      </BentoTilt>
      <BentoTilt className="col-span-1 row-span-1 h-full min-h-0 md:row-span-2">
        <BentoCard
          src={bmw2}
          title={
            <>
              M <b>X</b>Drive
            </>
          }
          description="Rear-biased all-wheel drive that can send torque where grip lives—confident in the wet, playful when you want it."
          isComingSoon
          ctaLabel="Traction"
        />
      </BentoTilt>

      <BentoTilt className="col-span-1 row-span-1 h-full min-h-0">
        <BentoCard
          src={bmw3}
          title={
            <>
              G<b>8</b>2 Form
            </>
          }
          description="Wide stance, carbon roof, and Competition aero that isn’t just for looks—it keeps the M4 planted at speed."
          isComingSoon
          ctaLabel="Design"
        />
      </BentoTilt>

      <BentoTilt className="col-span-2 row-span-1 h-full min-h-0 md:col-span-1">
        <BentoCard
          src={bmw4}
          title={
            <>
              Track <b>M</b>ode
            </>
          }
          description="Adaptive M suspension, M Servotronic steering, and configurable M modes so road and circuit each get their own setup."
          isComingSoon
          ctaLabel="Dynamics"
        />
      </BentoTilt>
    </div>
  </section>
);

export default FeaturesSection;
