import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"

export default function Layout() {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="style-sidebar-filters">
                <Sidebar />
            </div>
            <Outlet />
            <div>
                <Footer />
            </div>

        </>
    )
}