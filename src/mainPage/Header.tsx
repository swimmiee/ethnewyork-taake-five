import { Step } from "./step.enum";

interface HeaderProps {
  step: Step;
}

const titles = ["Toaster", "Risk", "Invest", "Price Range", "Input"];
export const Header = ({step}:HeaderProps) => {
    const title = titles[step];
  return (
    <header className="border-b py-3">
      <p className="text-3xl font-semibold text-center">{title}</p>
    </header>
  );
};
