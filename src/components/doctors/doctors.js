import React from "react";
import "./doctors.css";
import Dashboard from "../dashboard/dashboard";
class Doctors extends React.Component{
    constructor(props){
        super(props);
        this.handleDivClick = this.handleDivClick.bind(this);
        this.state = {
            "isDashBoardClicked" : false,
            "isDoctorsScreen" : true //Set it false before redirecting any other screen
        }
    }
    componentDidMount(){
        
    }
    handleDivClick(props){
        this.setState({isDoctorsScreen : false}); // Disable current screen
        switch(props.id){
            case "dashboard": 
                this.setState({isDashBoardClicked: true});
                break;
            default : 
            this.setState({isDoctorsScreen : true}); // By default set true same screen
        }
    }
    render(){
        return (
            <div>
            {this.state.isDoctorsScreen && (
                <div className="topView">
                    <div className="header">
                        <img src="/icons8-doctors-bag-48.png" alt="" className="headerImage"></img>
                        <label className="headerLabel" > My Clinic</label>
                    </div>
                    <div className="menuView">
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "dashboard"})}>
                        <img src="/icons8-dashboard-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Dashboard</label><br/><br/>
                    </div>
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "doctors"})}>
                        <img src="/icons8-medical-doctor-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel" id="doctorsLabel"> Doctors</label><br/><br/> 
                    </div>
                    <div className="menuList">
                        <img src="/icons8-planner-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Appointments</label><br/><br/>
                    </div>
                    <div className="menuList">
                        <img src="/icons8-hospital-bed-64.png" alt="" className="menuIcon"></img>
                       <label className="menuLabel"> Patients</label><br/><br/>
                    </div>
                    <div className="menuList">
                        <img src="/icons8-bill-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Invoice</label><br/><br/>
                    </div>
                    <div className="menuList">
                        <img src="/icons8-pills-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Prescription</label><br/><br/>
                    </div>
                    
                 </div>
                </div> )}
                {this.state.isDashBoardClicked && (
                    <Dashboard />
                )}
            </div>
        )
    }
}

export default Doctors;