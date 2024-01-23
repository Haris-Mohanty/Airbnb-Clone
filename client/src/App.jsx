import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/Page/PageNotFound";
import Home from "./components/Page/Home";
import LoginPage from "./components/Page/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/Page/RegisterPage";
import { UserContextProvider } from "./components/UserContext";
import Account from "./components/Page/Account";
import Places from "./components/Page/Places";
import PlacesForm from "./components/PlacesForm";
import PlacePage from "./components/Page/PlacePage";
import BookingsPage from "./components/Page/BookingsPage";
import BookingPlacePage from "./components/Page/BookingPlacePage";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/places" element={<Places />} />
            <Route path="/account/places/new" element={<PlacesForm />} />
            <Route path="/account/places/:id" element={<PlacesForm />} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route
              path="/account/bookings/:id"
              element={<BookingPlacePage />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
