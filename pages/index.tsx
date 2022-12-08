import { Header } from "../components/Container/Header";
import { Intro } from "../components/Container/intro";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <Intro />
      <div className="h-screen w-full bg-teal-400"></div>
    </div>
  );
}
