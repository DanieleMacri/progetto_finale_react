import { form } from "framer-motion/client";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function SearchBar() {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`)
            setSearch('');
        } else {
            setAriaInvalid(true);
        }
    }
    return (
        <form className="d-flex justify-content-start col-12 me-3 " onSubmit={handleSearch}>
            <fieldset role="group" className="d-flex align-items-center justify-content-center w-100">
                <input
                    type="text"
                    name="search"
                    placeholder={ariaInvalid ? "Inserisci qualcosa" : "Cerca..."}
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                    aria-invalid={ariaInvalid}
                    aria-label="Search"
                    className="form-control col-12 w-100 rounded-start-pill"
                />
                <button
                    type="submit"
                    value="Cerca"
                    className="btn btn-danger rounded-end-pill"><i className="fa-solid fa-magnifying-glass fa-lg" ></i>

                </button>
            </fieldset>
            {/* <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
        </form>

    );
}