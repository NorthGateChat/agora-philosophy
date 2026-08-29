import { PhilosophyMoment } from "./PhilosophyMoment";
import { thoughts } from "../content/philosophy";
import { dailyThoughtIndex } from "../lib/dailyThoughtIndex";
import { smartThoughtIndex } from "../lib/smartThoughtIndex";

const dailySeedRange = 1_000_003;

function dailyIndex() {
  const dailyRandom = dailyThoughtIndex(dailySeedRange) / dailySeedRange;
  return smartThoughtIndex(thoughts, { random: () => dailyRandom });
}

export default function Home() {
  return <PhilosophyMoment initialIndex={dailyIndex()} />;
}
