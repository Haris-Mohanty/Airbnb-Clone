import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/Page/PageNotFound";
import Home from "./components/Page/Home";
import LoginPage from "./components/Page/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
