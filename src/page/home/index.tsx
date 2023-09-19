import { BG } from "page/common/BG";
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

        <div className="flex flex-col gap-4">
          <button className="btn btn-primary-active">
            <Link to={ROUTES.V3}>Invest in UniswapV3</Link>
          </button>
          <button className="btn border-[1.5px] border-black bg-rose-400 text-black">
            <Link to={ROUTES.V4}>Invest in UniswapV4</Link>
          </button>
        </div>
      </div>
    </BG>
  );
}
