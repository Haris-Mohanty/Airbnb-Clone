import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/Page/PageNotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
