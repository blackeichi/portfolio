import { useRef } from "react";
import { Header } from "../components/Container/Header";
import { Intro } from "../components/Container/intro";

export default function Home() {
  const element = useRef<HTMLDivElement>(null);
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <Intro />
      <div ref={element} className="h-screen w-full bg-teal-400"></div>
    </div>
  );
}
