function Spa() {

  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          accountBalance: 0,
          users: [],
        }}
      >
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          {/* <Route path="/alldata/" component={AllData} /> */}
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}


ReactDOM.render(<Spa />, document.getElementById("root"));
