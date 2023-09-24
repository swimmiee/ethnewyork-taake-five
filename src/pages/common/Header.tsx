import ROUTES from "router/routes";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}
export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="border-b px-4 py-2.5 flex justify-between">
      <Link to={ROUTES.HOME} className="w-16 flex items-center text-neutral-600">
        <IoChevronBack size={22}/>
        <p className="text-lg">Back</p>
      </Link>
      <p className="text-2xl font-medium">{title}</p>
      <div className="w-16" />
    </header>
  );
};
