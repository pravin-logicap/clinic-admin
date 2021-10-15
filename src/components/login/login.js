import React from "react";
import "./login.css";
class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {"userName" : "", "password" : ""};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeUserName = this.handleChangeUserName.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      
    }
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
      if(userName === "pravin" && password==="p"){
          alert("Logged in Successfully")
      }else{
          alert("Please enter valid creds");
      }
    }

    render() {
      return (
          <div >
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
        </div>
      );
    }
  }

  export default Login;