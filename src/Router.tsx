import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import NavBar from "./components/NavBar";

function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/"} element={<Coins />} />
        <Route
          path={process.env.PUBLIC_URL + "/:coinId/*"}
          element={<Coin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
