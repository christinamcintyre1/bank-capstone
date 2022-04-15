function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validatePassword(userInput) {
    if (userInput.length < 8) {
      alert("Error: Password must be at least 8 characters long");
      return false;
    } else return true;
  }

  function validateEmail(userInput) {
    if (!userInput) {
      alert("Error: Email cannot be empty");
      return false;
    }
    return true;
  }

  function validateName(userInput) {
    if (!userInput) {
      alert("Error: Name cannot be empty");
      return false;
    }
    return true;
  }

  function handleCreate(submitFormElements) {
    //validation
    // if (!validatePassword(password)) return;
    // if (!validateEmail(email)) return;
    // if (!validateName(name)) return;

    console.log(name, email, password);
    //create account
    async function createAccount() {
      const response = await fetch("/account/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setStatus(data.error);
      } else {
        setStatus("Success! Account created");
        setShow(false);
        setUser(data.user);
        ctx.setUser(data.user);
      }
        //ctx.setUser(data);
        
    }
    createAccount();
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate(e.target.elements);
            }}
          >
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
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
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
            >
              Create Account
            </button>
          </form>
        ) : (
          <>
            <h5>Success</h5>
            <button
              type="submit"
              className="btn btn-light "
              onClick={clearForm}
            >
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
