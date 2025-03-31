import { Link, useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useState, useEffect, useContext } from "react"
import supabase from "../supabase/supabase-client"
import SessionContext from "../context/SessionProvider"
import { ul } from "framer-motion/m"

export default function Navbar() {

    const navigate = useNavigate()
    // const {session} = useContext(SessionContext)



    const [session, setSession] = useState(null)

    const getSession = async () => {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
            console.log(data);  //mostra l'ggetto della sessione aperta dopo la registrazione
            setSession(data.session);
        } else {
            setSession(null);
        }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log(error);
        alert("Logout effettuato con successo");
        // getSession(null);
        navigate("/");
    }

    useEffect(() => {
        getSession()
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-custom position-fixed">
                <div className="container-fluid">
                    <div className="col-2 col-md-3 d-flex justify-content-start">
                        <Link className="navbar-brand text-white ps-5" to="/">NextLevel</Link>

                    </div>
                    <div className="col-4 col-md-6 d-flex justify-content-end">
                        <SearchBar />

                    </div>
                    <div className="col-md-3 d-flex justify-content-end pe-5">
                        {session ? (
                            <ul className="d-flex align-items-center justify-content-center list-unstyled">
                                <li className="mx-2 mt-2">
                                    <Link className="text-white ul-navbar" onClick={signOut}>Esci</Link>
                                </li>
                                <li className="mx-2 mt-2">
                                    <Link className="text-white ul-navbar" to="/account">Profilo</Link>
                                </li>
                            </ul>
                            // <Link className="text-white ul-navbar" onClick={signOut}>Logout</Link>
                        ) : (
                            <div className="d-flex justify-content-center align-items-center">
                                <ul className="d-flex align-items-center justify-content-center list-unstyled">
                                    <li className="mx-2 mt-2">
                                        <Link className="text-white ul-navbar" to="/register">Registrati</Link>
                                    </li>
                                    <li className="mx-2 mt-2">
                                        <Link className="text-white ul-navbar" to="/login">Accedi</Link>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            </nav>

        </>
    )
}