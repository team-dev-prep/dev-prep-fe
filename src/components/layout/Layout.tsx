import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
