function Login(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');    
  
    return (
      <Card
        bgcolor="secondary"
        header="Login"
        status={status}
        body={show ? 
          <LoginForm setShow={setShow} setStatus={setStatus}/> :
          <LoginMsg setShow={setShow} setStatus={setStatus}/>}
      />
    ) 
  }
  
  function LoginMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Authenticate again
      </button>
    </>);
  }
  
  function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const ctx = React.useContext(UserContext);  

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

   function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.')
    });

    }
    function handle(){
      const user = ctx.users.find((user) => user.email == email);
      console.log(user);
      console.log(email, password);
      if (!user) {
        console.log('one')      
        props.setStatus('fail!')      
        return;      
      }
      if (user.password == password) {
        console.log('two')            
        props.setStatus('');
        props.setShow(false);
        return;      
      }
      console.log('three')          
      props.setStatus('fail!');        
    }
  
  
    return (
        <form>
  
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
      <button type="submit" className="btn btn-light" onClick={onSignIn}>Google SignIn</button>
      <div className="g-signin2" onClick={onSignIn} data-onsuccess="onSignIn"></div>
      <button type="submit" 
        className="btn btn-light"
      onClick={signOut}>Sign out</button>
  </form>


    );
    }
    
    