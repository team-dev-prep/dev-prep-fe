import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./constants";
import {
  FeedbackPage,
  InterviewPage,
  InterviewSetupPage,
  LandingPage,
  OAuthCallbackPage,
} from "./pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path={ROUTES.OPTION} element={<InterviewSetupPage />} />
          <Route path={ROUTES.INTERVIEW} element={<InterviewPage />} />
          <Route path={ROUTES.FEEDBACK} element={<FeedbackPage />} />
          <Route path={ROUTES.OAUTH_CALLBACK} element={<OAuthCallbackPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
