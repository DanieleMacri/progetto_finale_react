export default function Footer() {
    return (
        <>
            <footer className="d-flex justify-content-center align-items-center py-3 py-4 footer-custom">
                {/* <div className="col-md-4 d-flex align-items-center">
                    <a to="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                        <svg className="bi text-white" width="30" height="24"></svg>
                    </a>
                    <span className="mb-3 mb-md-0 text-body-secondary text-white">&copy; 2024 Company, Inc</span>
                </div> */}

                <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
                    <li className="ms-3">
                        <a href="https://github.com/DanieleMacri">
                            <i class="fa-brands fa-github fa-lg text-white"></i> </a>
                    </li>
                    <li className="ms-3">
                        <a href="https://www.facebook.com/daniele.macri.395/?locale=it_IT">
                            <i class="fa-brands fa-facebook fa-lg text-white"></i></a>
                    </li>
                    <li className="ms-3">
                        <a href="https://www.instagram.com/danielemacri_/">
                            <i class="fa-brands fa-instagram fa-lg text-white"></i></a>
                    </li>
                </ul>
            </footer>
        </>
    )
}