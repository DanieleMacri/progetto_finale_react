import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container-fluid">
                    <div className="col-2 d-flex justify-content-start">
                        <Link className="navbar-brand text-white " to="/">NextLevel</Link>
                        
                    </div>
                    <div className="col-7 col-md-10 d-flex justify-content-end">
                        <SearchBar />

                    </div>
                    {/* <div className="col-4"> */}
                        {/* <div className="collapse navbar-collapse col-2" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/">Link</Link>
                                </li> */}
                                {/* <li className="nav-item dropdown"> */}
                                    {/* <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a> */}
                                    {/* <ul className="dropdown-menu"> */}
                                        {/* <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                                    {/* </ul> */}
                                {/* </li> */}

                            {/* </ul>

                        </div> */}

                    {/* </div> */}

                </div>
            </nav>

        </>
    )
}