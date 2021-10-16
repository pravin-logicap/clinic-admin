import React from "react";
import "./listView.css";
import Dashboard from "../dashboard/dashboard";
import Doctors from "../doctors/doctors";

class ListView extends React.Component{
    constructor(props){
        super(props);
        this.handleDivClick = this.handleDivClick.bind(this);
        // Expect page as pageName from previous component. This component can be reused for different menu.
        let pageName = props.page;
        console.log("Page Name >> ",pageName);
        this.state = {
            "isDashBoardClicked" : false,
            "isListScreen" : true, //Set it false before redirecting any other screen
            "doctorsList" : [],
            "selectedPageName" : pageName
        }
    }
    componentDidMount(){
        
    }
    handleDivClick(props){
        this.setState({isListScreen : false}); // Disable current screen
        switch(props.id){
            case "dashboard": 
                this.setState({isDashBoardClicked: true});
                break;
            case "doctors": 
                this.setState({isDoctorClicked: true});
                break;
            default : 
                this.setState({isListScreen : true}); // By default set true same screen
        }
    }
    render(){
        return (
            <div>
                {this.state.isDashBoardClicked && (
                    <Dashboard />
                )}
            {this.state.isListScreen && (
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
                        <label className="menuLabel"> Doctors</label><br/><br/> 
                    </div>
                    <div className="menuList">
                        <img src="/icons8-planner-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel" id={this.state.selectedPageName === "Appointments" ? "appointmentsLabel" : ""}> Appointments</label><br/><br/>
                    </div>
                    <div className="menuList">
                        <img src="/icons8-hospital-bed-64.png" alt="" className="menuIcon"></img>
                       <label className="menuLabel" id={this.state.selectedPageName === "Patients" ? "patientLabel" : ""}>Patients</label><br/><br/>
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
                 <div className="doctorView">
                    <PageTitle pageName={this.state.selectedPageName} />
                </div>
                </div>  
            )}
            {this.state.isDoctorClicked && (
                    <Doctors />
            )}
        </div>
        )
    }
}

function PageTitle(props){
    return(
    <div className="pageHeader">
       <label className="pageHeaderLabel"> {props.pageName}</label>
    </div>
    );
}
export default ListView;