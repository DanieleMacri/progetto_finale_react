import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/homepage";
import ErrorPage from "../pages/error";
import Layout from "../layout/Layout";
import GenrePage from "../pages/genrepage";
import GamePage from "../pages/gamepage";
import SearchPage from "../pages/searchpage";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import AccountPage from "../pages/account";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/games/:genre" element={<GenrePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/games/:slug/:id" element={<GamePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
