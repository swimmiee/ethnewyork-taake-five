import { BG } from "pages/common/BG";
import { Link } from "react-router-dom";
import ROUTES from "router/routes";

export default function HomePage() {
  return (
    <BG>
      <div className="flex flex-1 flex-col justify-center p-4">
        <div>

        <img src="/logo.png" className="w-48 mx-auto" />
        </div>
        <p className="text-xl mb-12 text-centerg">
          Interactive DeFi investing service for you
        </p>
        <div className="flex flex-col gap-4">
          <Link
            className="flex-center btn border-[1.5px] border-black bg-primary-500"
            to={ROUTES.V3}
          >
            Invest in UniswapV3
          </Link>
          {/* <Link
            to={ROUTES.V4}
            className="flex-center btn border-[1.5px] border-black bg-rose-400 text-black"
          >
            Invest in UniswapV4
          </Link> */}
        </div>
      </div>
    </BG>
  );
}
