const ExperienceConfigureCta = () => (
  <section
    id="bmw-experience-configure"
    className="relative bg-[#080808] w-screen overflow-hidden"
  >
    <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 pb-20 lg:pb-28">
      <div className="mt-20 lg:mt-28 relative rounded-3xl overflow-hidden border border-white/[0.07]">
        <div className="relative h-[220px] sm:h-[260px]">
          <video
            src="/videos/bmw/bmw1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-12 lg:px-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/80 font-semibold mb-3">
                Configure Yours
              </p>
              <h3 className="text-white font-black text-2xl sm:text-3xl lg:text-5xl uppercase leading-tight mb-5">
                Your Perfect M4
                <br />
                <span className="text-blue-400">Awaits.</span>
              </h3>
              <div className="relative w-fit">
                {/* Pulse ring */}
                <span
                  aria-hidden
                  className="absolute -inset-1 rounded-2xl border border-blue-500/50 animate-[cta-pulse_2.2s_ease-in-out_infinite] opacity-0"
                />
                <button
                  id="cta-configure"
                  className="group relative overflow-hidden bg-blue-600 hover:bg-blue-500 active:scale-[0.97] text-white text-xs uppercase font-bold tracking-widest px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2.5 border border-blue-500/60 hover:border-blue-400/80 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {/* Shimmer */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
                  />
                  <span className="relative inline-flex overflow-hidden">
                    <span className="block translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                      Configure Now
                    </span>
                    <span className="absolute block translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                      Configure Now
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceConfigureCta;
