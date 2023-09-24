import { createElement, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface DescriptionProps {
  title: string;
  children: React.ReactElement | React.ReactElement[];
}
export const Description = ({ title, children }: DescriptionProps) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((p) => !p);
  return (
    <div>
      <div onClick={toggle} className="flex items-center gap-1 mb-1.5">
        <p className="text-lg">{title}</p>
        {createElement(
            open ? IoChevronUp : IoChevronDown,
            {size: 20}
        )}
      </div>
      {open && <div>{children}</div>}
    </div>
  );
};
