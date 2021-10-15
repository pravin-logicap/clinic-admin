import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import React from "react";


class Login1 extends React.Component {
  constructor(props){
    super(props);
    this.state = {"name" : props.name};
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.state = {"numbres" : [1,2,3,4,5], "value" : ""};
    
  }
  componentDidMount(){
    console.log("componentDidMount >>");
    this.loadData();
  }
   
  loadData(){
    this.setState({
      name : "Pravin"
    })
  }
 
  handleClick(event){
    let val = this.state.value;
    this.setState({name : this.state.value})
    alert("Name submitted is >> "+ val)
  }
  handleChange(event){
    this.setState({
      value : event.target.value
    })
  }
  render() {
    return(
      <Login />
    );
    /*
    return (
      <div>
        <h5> This is {this.state.name}</h5>
        <div>
          <form onSubmit={this.handleClick}>
            <input type="text"  value={this.state.value} onChange={this.handleChange}></input>
            <button type= "submit" value="submit">
              Submit
            </button>
          </form>
          
        </div>
        <NumberList numbers={this.state.numbres} />
      </div>
    );
    */}
    }

function App() {
  return (
    <div className="App">
      <Login1 name="Sara" />
    </div>
  );
}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>{numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    )}</ul>
  );
}

export default App;
