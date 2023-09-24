import { V3Invests } from "config/invests.config";
import { Step } from "pages/v3/step.enum";
import { useEffect, useState } from "react";
import { useV3Selection } from "states/v3-global.states";
import { InvestItem } from "./InvestItem";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { findTokens } from "config";

interface InvestItemListProps {
  chainId: number | null;
}

const tierRisk: Record<number, [number, number]> = {
  0: [1, 1.5],
  1: [1.5, 2],
  2: [2, 3],
  3: [0, 99],
};

const isInRisk = ({ tier }: { tier: number }, risk: number) =>
  Number(tierRisk[risk][0] <= tier && tier <= tierRisk[risk][1]);

export const InvestItemList = ({ chainId }: InvestItemListProps) => {
  const [risk] = useV3Selection(Step.Risk);
  const [, setInvestment] = useV3Selection(Step.Investment);

  const investList = V3Invests.filter(
    (invest) => chainId === null || invest.chainId === chainId
  )
    .filter((i) => findTokens(i.chainId, i.inputAssets, false).every(Boolean))
    .sort((a, b) => b.apr - a.apr) // high to low
    .sort((a, b) => a.tier - b.tier) // low to high
    .sort((a, b) => isInRisk(b, Number(risk)) - isInRisk(a, Number(risk)));
    
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 5;
  const maxPage = Math.floor(Math.max(0, investList.length - 1) / itemsPerPage);
  const toPrevPage = () => setPage((page) => Math.max(0, page - 1));
  const toNextPage = () => setPage((page) => Math.min(page + 1, maxPage));

  useEffect(() => {
    // reset investment selection
    setPage(0);
    setInvestment(null);
  }, [chainId]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {investList
          .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
          .map((invest, i) => (
            <InvestItem key={i} {...invest} />
          ))}
      </div>

      <div className="flex-center gap-2 mt-2">
        <IoChevronBack onClick={toPrevPage} />
        <p className="text-lg">
          {page + 1} / {maxPage + 1}
        </p>
        <IoChevronForward onClick={toNextPage} />
      </div>
    </div>
  );
};
