import { Step } from "page/v3/step.enum";
import { atom, useRecoilState, useRecoilValue } from "recoil";

const stepAtom = atom<Step>({
  key: "atom/step",
  default: Step.Risk,
});

interface Selections {
  [Step.Risk]: number | null;
  [Step.Investment]: string | null;
  [Step.PriceRange]: number | null;
  [Step.Input]: number | null;
  [Step.Last]: number | null;
}

const selectionsAtom = atom<Selections>({
  key: "atom/selections",
  default: {
    [Step.Risk]: null,
    [Step.Investment]: null,
    [Step.PriceRange]: null,
    [Step.Input]: null,
    [Step.Last]: null,
  },
});

export const useV3Step = () => {
  const [step, setStep] = useRecoilState(stepAtom);
  const selections = useRecoilValue(selectionsAtom);
  let canNext = false;
  switch (step) {
    case Step.Risk:
      canNext = selections[Step.Risk] !== null && selections[Step.Risk] > -1;
      break;
    case Step.Investment:
      canNext = selections[Step.Investment] !== null;
      break;
    case Step.PriceRange:
      canNext = true;
      break;
    case Step.Input:
      canNext = true;
      break;
    case Step.Last:
      canNext = true;
      break;
  }

  return [step, setStep, canNext] as const;
};

export const useV3Selection = (step: Step) => {
  const [selection, setSelection] = useRecoilState(selectionsAtom);
  return [
    selection[step],
    (value: (typeof selection)[Step]) => {
      setSelection((selections) => ({
        ...selections,
        [step]: value,
      }));
    },
  ] as const;
};
