import { V3Invests } from "config/invests.config";
import { Step } from "page/v3/step.enum";
import { useState } from "react";
import { useV3Selection } from "states/v3-global.states";

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

  const [page, setPage] = useState<number>(0);
  const pageItems = 3;
  const investList = V3Invests.filter(
    (invest) => chainId === null || invest.chainId === chainId
  )
  .sort((a, b) => b.apr - a.apr) // high to low
  .sort((a, b) => a.tier - b.tier) // low to high
  .sort((a, b) => isInRisk(b, Number(risk)) - isInRisk(a, Number(risk)));

  return (
    <div>
      {investList
        .slice(page * pageItems, (page + 1) * pageItems)
        .map((invest) => (
          <div>{invest.project} {invest.name}</div>
        ))}
    </div>
  );
};
