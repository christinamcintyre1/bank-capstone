function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [user, setUser] = React.useState("");
  const ctx = React.useContext(UserContext);

  function LoginMsg(props) {
    return (
      <>
        <h5>Authenticated.</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => {
            ctx.login({});
            props.setShow(true);
            props.setStatus("Logged Out.");
          }}
        >
          Log Out?
        </button>
      </>
    );
  }

  function LoginForm(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const ctx = React.useContext(UserContext);

    function handleLogin() {
      async function login() {
        // const user = ctx.users.find((user) => user.email == email);
        const response = await fetch("/account/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          props.setStatus("fail!");
        } else {
          if (data.authenticated) {
            props.setStatus("Success! Authenticated");
            props.setShow(false);
            setUser(data);
            ctx.login(data);
          } else {
            props.setStatus("fail!");
          }
        }
      }
      login();
    }

    function signOut() {
      props.setShow(true);
      props.setStatus("");
    }

    return (
      <form>
        Email
        <br />
        <input
          type="input"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
        <button type="submit" className="btn btn-light" onClick={handleLogin}>
          Login
        </button>
        {/* <hr></hr>
        <button type="submit" className="btn btn-light" onClick={signOut}>
          SignOut
        </button> */}
      </form>
    );
  }

  return (
    <>
      <Card
        bgcolor="secondary"
        header="Login"
        status={status}
        body={
          show ? (
            <LoginForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <LoginMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </>
  );
}
