import { PhilosophyMoment } from "./PhilosophyMoment";
import { dailyThoughtIndex } from "../lib/dailyThoughtIndex";

function dailyIndex() {
  return dailyThoughtIndex();
}

export default function Home() {
  return <PhilosophyMoment initialIndex={dailyIndex()} />;
}
