import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router";

function MainLayout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Header />}

      <main>
        <Outlet />
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default MainLayout;
