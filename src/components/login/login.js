import React from "react";
import "./login.css";
import Dashboard from "../dashboard/dashboard";
class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {"userName" : "", "password" : "", "isLoggedIn": false};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeUserName = this.handleChangeUserName.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      
    }
    // This function will load when actual component or UI is rendered. We can set value which we want to display on UI when launch this screen
    componentDidMount(){
    }
    handleChangeUserName(event){
        this.setState({userName: event.target.value});
    }
    handleChangePassword(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
      let userName = this.state.userName;
      let password = this.state.password;
      //TODO: Make API call to server to fetch user details to validate. (Encrypt password)
      if(userName === "" && password===""){
         this.setState({isLoggedIn : true});
      }else{
          alert("Please enter valid creds");
      }
    }

    render() {
      return (
          <div>
            {!this.state.isLoggedIn && (
            <div className="login">
                <h2>Log in</h2>
            <div>
                <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChangeUserName} value={this.state.userName} placeholder="User name" className="inputbox"></input>
                <br/><br/>
                <input type="password" onChange={this.handleChangePassword} value={this.state.password} placeholder="Password" className="inputbox"></input>
                <br/><br/>
                <button type= "submit" value="submit" className="button">
                    Login
                </button>
                </form>
            </div>
            </div>
            )} 
            {this.state.isLoggedIn && (
             <div>
               <Dashboard/>
              </div>
            )}
        </div>
      );
    }
  }

  export default Login;