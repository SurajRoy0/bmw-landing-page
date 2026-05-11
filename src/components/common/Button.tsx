"use client";

import clsx from "clsx";

interface ButtonProps {
  id: string;
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
  variant?: "primary" | "ghost" | "outline";
}

const Button = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
  variant = "primary",
}: ButtonProps) => {
  const base =
    "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 px-7 py-3 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black select-none";

  const variants = {
    primary:
      "bg-blue-600 text-white border border-blue-500/60 hover:bg-blue-500 hover:border-blue-400/80 hover:shadow-[0_0_32px_-6px_rgba(59,130,246,0.55)] active:scale-[0.97]",
    ghost:
      "bg-white/[0.05] text-white border border-white/10 hover:bg-white/[0.1] hover:border-white/25 hover:shadow-[0_0_24px_-8px_rgba(255,255,255,0.12)] active:scale-[0.97]",
    outline:
      "bg-transparent text-blue-400 border border-blue-500/50 hover:bg-blue-600/10 hover:border-blue-400/70 hover:shadow-[0_0_24px_-8px_rgba(59,130,246,0.4)] active:scale-[0.97]",
  };

  return (
    <button id={id} className={clsx(base, variants[variant], containerClass)}>
      {/* Shimmer sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.14] to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
      />

      {leftIcon}

      {/* Skew-flip text animation */}
      <span className="relative inline-flex overflow-hidden">
        <span className="block translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </span>
        <span className="absolute block translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </span>
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;
