import logo from "./assets/logo.png";

const Header = () => {
  return (
    <nav className="bg-light mb-4 pt-1 pb-1">
        <div className="container">
            <a className="navbar-brand" href="/">
                <div className="d-flex">
                    <img src={logo} alt="Logo" className="mr-2" />
                    <div>Project Manager</div>
                </div>
            </a>
        </div>
    </nav>
  );
};

export default Header;
