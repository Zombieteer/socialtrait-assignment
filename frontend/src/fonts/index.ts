import localFont from "next/font/local";

export const verdana = localFont({
  src: [
    {
      path: "../fonts/verdana-bold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/verdana.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});
