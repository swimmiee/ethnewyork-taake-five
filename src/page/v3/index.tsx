import { BG } from "page/common/BG";
import { useEffect } from "react";
import { Step } from "./step.enum";
import { Header } from "../common/Header";
import { useV3Step } from "states/v3-global.states";
import { Footer } from "./sections/Footer";
import Risk from "./slides/Risk";
import Investment from "./slides/investment";
import titles from "./sections/titles";

export default function InvestV3Page() {
  const [step, setStep] = useV3Step();
  const title = titles[step];
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
      <Header title={title} />
      {step === Step.Risk && <Risk />}
      {step === Step.Investment && <Investment />}

      <Footer />
    </BG>
  );
}
