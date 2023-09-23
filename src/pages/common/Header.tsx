import ROUTES from "router/routes";
import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}
export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="border-b px-4 py-2.5 flex justify-between">
      <p className="text-lg font-medium">{title}</p>

      <Link to={ROUTES.HOME} className="flex items-center text-neutral-600">
        <p className="text-lg">Back</p>
        <IoChevronForward size={22} className="-mr-2" />
      </Link>
    </header>
  );
};