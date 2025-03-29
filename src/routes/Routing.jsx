import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/homepage";
import ErrorPage from "../pages/error";
import Layout from "../layout/Layout";
import GenrePage from "../pages/genrepage";


export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

