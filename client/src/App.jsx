import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/Page/PageNotFound";
import Home from "./components/Page/Home";
import LoginPage from "./components/Page/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/Page/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
