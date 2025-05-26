import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLoginStatus } from "./store/authSlice";
import Layout from "./components/Layout";
import Overview, { loader as toursLoader } from "./components/overview";
import Tour from "./components/tour";
import Login from "./components/login";
import Account from "./components/account";
import Signup from "./components/signup";
import ErrorPage from "./components/error";
import LoadingScreen from "./components/LoadingScreen";
import Contact from "./components/contact";
import { contactAction } from "./components/actions";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Overview />,
          loader: toursLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "tour/:slug",
          element: <Tour />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "me",
          element: <Account />,
        },
        {
          path: "contact",
          element: <Contact />,
          action: contactAction,
        },
      ],
    },
  ],
  {
    fallbackElement: <LoadingScreen />,
  }
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  return <RouterProvider router={router} />;

  // return (
  // <AuthProvider>
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Layout />}>
  //       <Route index element={<Overview />} />
  //       <Route path="/tour/:slug" element={<Tour />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/me" element={<Account />} />
  //     </Route>
  //   </Routes>
  // </BrowserRouter>
  // </AuthProvider>
  // );
}

export default App;
