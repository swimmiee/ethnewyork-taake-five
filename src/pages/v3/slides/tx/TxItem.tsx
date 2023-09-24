import { LiaExchangeAltSolid } from "react-icons/lia";
import { BsCurrencyDollar } from "react-icons/bs";

interface TxItemProps {
  description: string;
}
export const TxItem = ({ description }: TxItemProps) => {
  const props = [
    {
      title: "swap",
      Icon: (
        <div className="flex-center w-12 h-12 border-[1.5px] border-black bg-primary rounded-full">
          <LiaExchangeAltSolid size={32} />
        </div>
      ),
    },
    { title: "approve", Icon: <img className="w-12 h-12" src="./Check.svg" /> },
    {
      title: "invest",
      Icon: (
        <div className="flex-center w-12 h-12 border-[1.5px] border-black bg-primary rounded-full">
          <BsCurrencyDollar size={32} />
        </div>
      ),
    },
  ];
  const prop = props.find((p) => {
    return description.toLowerCase().split(" ")[0].includes(p.title);
  });

  if (!prop) {
    console.warn("!!!");
    return null;
  }
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      {prop.Icon}
      <div>
        <p className="text-lg font-semibold first-letter:uppercase">
          {prop.title}
        </p>
        <p>{description.split(" ").slice(1).join(" ")}</p>
      </div>
    </div>
  );
};
