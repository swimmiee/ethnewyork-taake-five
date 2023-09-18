import { useEffect, useState } from "react";
import Intro from "./slides/Intro";
import { Step } from "./step.enum";
import { Header } from "./sections/Header";
import { useStep } from "states/step.atom";
import Risk from "./slides/Risk";
import { Footer } from "./sections/Footer";

export default function MainPage() {
  const [step] = useStep();
  // prevent go back
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  return (
    <div className="bg-background w-screen h-screen">
      <div className="bg-white h-full mx-auto max-w-3xl flex flex-col justify-between">
        <Header />
        {step === Step.Intro && <Intro />}
        {step === Step.Risk && <Risk />}

        {step > 0 && <Footer />}
      </div>
    </div>
  );
}
