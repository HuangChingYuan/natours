import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ user, setUser }) => {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
