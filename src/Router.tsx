import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./constants";
import {
  FeedbackPage,
  InterviewPage,
  InterviewSetupPage,
  LandingPage,
  OAuthCallbackPage,
  PreFeedbackPage,
  PreInterviewPage,
  PreInterviewSetupPage,
} from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Layout />}>
        <Route index element={<LandingPage />} />

        {/* 비로그인 사용자용 로직 */}
        <Route path={ROUTES.PRE_OPTION} element={<PreInterviewSetupPage />} />
        <Route path={ROUTES.PRE_INTERVIEW} element={<PreInterviewPage />} />
        <Route path={ROUTES.PRE_FEEDBACK} element={<PreFeedbackPage />} />

        {/* 로그인 사용자용 로직 */}
        <Route path={ROUTES.OPTION} element={<InterviewSetupPage />} />
        <Route path={ROUTES.INTERVIEW} element={<InterviewPage />} />
        <Route path={ROUTES.FEEDBACK} element={<FeedbackPage />} />

        <Route path={ROUTES.OAUTH_CALLBACK} element={<OAuthCallbackPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
