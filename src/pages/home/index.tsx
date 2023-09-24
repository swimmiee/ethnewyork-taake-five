import { BG } from "pages/common/BG";
import { Link } from "react-router-dom";
import ROUTES from "router/routes";

export default function HomePage() {
  return (
    <BG>
      <div className="flex flex-1 flex-col justify-center p-4">
        <p className="text-3xl mb-2">Interactive</p>
        <p className="text-3xl mb-2">DeFi investing service</p>
        <p className="text-3xl mb-8">
          for&nbsp;
          <b className="font-medium">YOU</b>
        </p>

        <p className="text-xl mt-4  mb-2">Invest</p>
        <div className="flex flex-col gap-4">
          <Link className="flex-center btn border-[1.5px] border-black bg-primary-500" to={ROUTES.V3}>
            Invest in UniswapV3
          </Link>
          <Link
            to={ROUTES.V4}
            className="flex-center btn border-[1.5px] border-black bg-rose-400 text-black"
          >
            Invest in UniswapV4
          </Link>
        </div>
      </div>
    </BG>
  );
}
