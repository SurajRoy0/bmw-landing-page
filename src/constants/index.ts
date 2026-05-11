import {
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
} from "../utils";

export const navLists = ["Models", "BMW M", "Experience", "Contact"];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "S58 Twin-Turbo Engine.",
      "503 horsepower.",
      "Pure performance unleashed.",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["M4 Competition.", "Track-bred. Street-ready. Uncompromising."],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "0-60 mph in 3.8 seconds.",
      "Precision engineering.",
      "Ultimate driving machine.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["M xDrive all-wheel drive.", "Maximum grip. Maximum control."],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

export const bmwColors = [
  { label: "Isle of Man Green", hex: "#2D5A27" },
  { label: "M Portimao Blue", hex: "#1C3F6E" },
  { label: "Alpine White", hex: "#F0EEE9" },
  { label: "Sapphire Black", hex: "#0F0F12" },
  { label: "Toronto Red", hex: "#B31B1B" },
  { label: "Sao Paulo Yellow", hex: "#E9F13B" },
];

export const lightPresets = [
  { label: "Studio", value: "studio" },
  { label: "Showroom", value: "showroom" },
  { label: "Night", value: "night" },
  { label: "Outdoor", value: "outdoor" },
];

export const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Sales Policy",
  "Legal",
  "Site Map",
];