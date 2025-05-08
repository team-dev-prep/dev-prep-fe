import { Toaster } from "sonner";
import Router from "./Router";

const App = () => {
  return (
    <>
      <Router />
      <Toaster position="top-right" duration={3000} />
    </>
  );
};

export default App;
