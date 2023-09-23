import { BG } from "pages/common/BG";
import { useEffect } from "react";
import { Step } from "./step.enum";
import { Header } from "../common/Header";
import { useV3Step } from "states/v3-global.states";
import { Footer } from "./sections/Footer";
import Risk from "./slides/Risk";
import Investment from "./slides/investment";
import titles from "./sections/titles";
import { Done } from "./slides/done";
import { InputAmount } from "./slides/inputAmount";
import { PriceRange } from "./slides/priceRange";

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
      {step === Step.PriceRange && <PriceRange />}
      {step === Step.Input && <InputAmount />}
      {step === Step.Done && <Done />}

      <Footer />
    </BG>
  );
}
