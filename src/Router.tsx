import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
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
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="option" element={<InterviewSetupPage />} />
          <Route path="interview" element={<InterviewPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="oauth/callback" element={<OAuthCallbackPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
