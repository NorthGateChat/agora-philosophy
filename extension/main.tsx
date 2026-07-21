import { createRoot } from "react-dom/client";
import { PhilosophyMoment } from "../app/PhilosophyMoment";
import "../app/globals.css";
import brand from "../brand.json";
import { dailyThoughtIndex } from "../lib/dailyThoughtIndex";

document.title = brand.storeNameZhHans;

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing extension root element");
}

createRoot(rootElement).render(
  <PhilosophyMoment initialIndex={dailyThoughtIndex()} />,
);
