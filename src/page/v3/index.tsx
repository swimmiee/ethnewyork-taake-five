import { BG } from "page/common/BG";
import { useEffect } from "react";
import { Step } from "./step.enum";
import { Header } from "./sections/Header";
import { useStep } from "states/step.atom";
import { Footer } from "./sections/Footer";
import Risk from "./slides/Risk";
import Investment from "./slides/Investment";

export default function InvestV3Page() {
  const [step, setStep] = useStep();
  // prevent go back
  useEffect(() => {
    setStep(Step.Risk);
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  return (
    <BG>
      <Header />
      {step === Step.Risk && <Risk />}
      {step === Step.Investment && <Investment />}

      <Footer />
    </BG>
  );
}
