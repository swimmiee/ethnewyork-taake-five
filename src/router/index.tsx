import InvestV3Page from "page/v3";
import ROUTES from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "page/home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.V3} element={<InvestV3Page />} />
      </Routes>
    </BrowserRouter>
  );
}
