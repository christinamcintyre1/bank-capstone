function NavBar() {
  const ctx = React.useContext(UserContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="login"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Enter information to login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="createaccount"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Enter inofrmation to create an account"
              >
                Create Account
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="deposit"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Enter amount to deposit funds to your account"
              >
                Deposit
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="withdraw"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Enter amount to withdraw funds to your account"
              >
                Withdraw
              </NavLink>
            </li>
            {ctx.user && <strong>{ctx.user.name}</strong>}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
