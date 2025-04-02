import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./components/overview";
import Tour from "./components/tour";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="/tour/:slug" element={<Tour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
