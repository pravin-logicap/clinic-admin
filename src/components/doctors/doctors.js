import React from "react";
import "./doctors.css";
import Dashboard from "../dashboard/dashboard";
import Grid from "@material-ui/core/Grid";
import ListView from "../listView/listView";
import InvoiceList from "../invoice/invoiceList";
class Doctors extends React.Component{
    constructor(props){
        super(props);
        this.handleDivClick = this.handleDivClick.bind(this);
        this.state = {
            "isDashBoardClicked" : false,
            "isDoctorsScreen" : true, //Set it false before redirecting any other screen
            "doctorsList" : [],
            "isInvoiceCLicked" : false,
            "isListClicked" : false
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
        case "appointments":
            this.setState({isListClicked:true});
            this.setState({"listPageName" : "Appointments"});
            break;
        case "patients":
            this.setState({isListClicked:true});
            this.setState({"listPageName" : "Patients"});
            break;
        case "invoice":
                this.setState({isInvoiceCLicked:true});
                break;
            default : 
            this.setState({isDoctorsScreen : true}); // By default set true same screen
            
        }
    }
    render(){
        return (
            <div>
            {this.state.isDashBoardClicked && (
                <Dashboard />
            )}
            {this.state.isListClicked && (
                <ListView page={this.state.listPageName}/>
            )} 
            {this.state.isInvoiceCLicked && (
                 <InvoiceList />
            )}
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
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "appointments"})}>
                        <img src="/icons8-planner-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Appointments</label><br/><br/>
                    </div>
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "patients"})}>
                        <img src="/icons8-hospital-bed-64.png" alt="" className="menuIcon"></img>
                       <label className="menuLabel"> Patients</label><br/><br/>
                    </div>
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "invoice"})}>
                        <img src="/icons8-bill-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Invoice</label><br/><br/>
                    </div>
                    <div className="menuList">
                        <img src="/icons8-pills-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Prescription</label><br/><br/>
                    </div>
                 </div>
                 <div className="doctorView">
                   <FetchDoctorsList />
                </div>
                </div> )}
            </div>
        )
    }
}

function FetchDoctorsList(){
    //TODO: MAke API call to fetch doctors list and display on screen
    let doctorsList = [{
        "name" : "Dr Amit Bhapkar",
        "designation" : "doctor",
        "qualification" : "B.H.M.S",
        "address" : "Baramati",
        "contact" : "99988008888",
        "profileImage" : "https://i.ibb.co/7vXsYXQ/amit.png" 
    },
    {
        "name" : "Dr Reshma Amit Bhapkar",
        "designation" : "doctor",
        "qualification" : "B.A.M.S",
        "address" : "Baramati",
        "contact" : "99988008888",
        "profileImage" : null
    },
    {
        "name" : "Dr Gorakh Bhapkar",
        "designation" : "doctor",
        "qualification" : "B.A.M.S",
        "address" : "Baramati",
        "contact" : "99988008888",
        "profileImage" : null
    },
    {
        "name" : "Dr Bhapkar Madam",
        "designation" : "doctor",
        "qualification" : "B.A.M.S",
        "address" : "Baramati",
        "contact" : "99988008888",
        "profileImage" : null
    }];

    // Now we have list from API call
    return(
        <Grid container spacing={2} className="grid">
        {doctorsList.map((doctor) => 

            <div className="grid-item">
                <div className="doctorBlock1">
                        <div className="blockImageDiv">
                            <img src={doctor.profileImage ? doctor.profileImage : "/icons8-medical-doctor-64.png"} alt="" className="blockImage"></img>
                        </div>
                        <div className="blockCountLabelDiv">
                            <label className="blockLabelDoctors">{doctor.name}</label>
                        </div>
                        <div className="blockNameLabelDiv">
                            <label className="blockLabel1" >{doctor.qualification}</label>
                        </div>
                   </div>
            </div>
        )}
    </Grid>
    );
}
export default Doctors;