function Deposit() {
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [amount, setAmount] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(ctx.accountBalance);
  const [status, setStatus] = React.useState("");

  const isNumber = (userInput) => !isNaN(userInput);

  const isPostiveNumber = (userInput) => userInput > 0;

  function handleCreate() {
    if (!isNumber(amount)) {
      //isn't a number
      alert("Please enter a number");
    } else if (!isPostiveNumber(amount)) {
      //is a number but not positive
      alert("Please enter a positive number");
    } else {
      setTotalAmount(parseFloat(amount) + totalAmount);
      ctx.accountBalance = parseFloat(amount) + totalAmount;
      setShow(false);
    }
  }

  function clearForm() {
    setAmount("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Account Deposit"
      status={status}
      body={
        show ? (
          <>
            <h4>Balance: ${totalAmount.toFixed(2) || "0.00"}</h4>
            Amount
            <br />
            <input
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleCreate}
              disabled={!amount}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button
              type="submit"
              className="btn btn-light "
              onClick={clearForm}
            >
              Add another Deposit
            </button>
          </>
        )
      }
    />
  );
}
