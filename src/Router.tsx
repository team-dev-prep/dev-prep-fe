import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Interview from "./pages/InterView";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Interview />} />
          <Route path="/interview" element={<Interview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
