import { IoAddCircle } from "react-icons/io5";

interface AddButtonProps {
  onClick: () => void;
}
export const AddButton = ({onClick}:AddButtonProps) => {
  return (
    <button onClick={onClick} className="flex-center flex-col rounded-xl border-2 border-dashed h-36">
      <IoAddCircle size={64} className="text-neutral-100" />
      <p className="text-neutral-600" >Click to Add Input</p>
    </button>
  );
};
