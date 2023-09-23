import { TokenIcon } from "./TokenIcon";

interface DoubleHzTokensIconProps {
  tokens: {
    chainId: number;
    logoURI: string;
    symbol?: string;
  }[];
}

// assert tokens[0] and tokens[1] are not null and chain Ids are the same
export const DoubleTokensIcon = ({ tokens }: DoubleHzTokensIconProps) => {
  return (
    <div className="flex items-center">
      <TokenIcon size="xl" token={tokens[0]} />
      <div className="-ml-3">
        <TokenIcon size="xl" token={tokens[1]} />
      </div>
    </div>
  );
};
