import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLoginStatus } from "./store/authSlice";
import Layout from "./components/Layout";
import Overview from "./components/overview";
import Tour from "./components/tour";
import Login from "./components/login";
import Account from "./components/account";
import Signup from "./components/signup";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);
  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="/tour/:slug" element={<Tour />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
