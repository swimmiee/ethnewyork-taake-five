import { useStep } from "states/step.atom";
import titles from "./titles";

export const Header = () => {
  const [step] = useStep();
  const title = titles[step];
  return (
    <header className="border-b px-4 py-2.5">
      <p className="text-lg font-medium">{title}</p>
    </header>
  );
};
