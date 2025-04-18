import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Overview from "./components/overview";
import Tour from "./components/tour";
import Login from "./components/login";
import Account from "./components/account";
import Signup from "./components/signup";

function App() {
  let [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Overview />} />
          <Route path="/tour/:slug" element={<Tour />} />
          <Route
            path="/signup"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/me"
            element={<Account user={user} setUser={setUser} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
