import React from "react";
import "./dashboard.css";
import Doctors from "../doctors/doctors";
import ListView from "../listView/listView";
import InvoiceList from "../invoice/invoiceList";
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.handleDivClick = this.handleDivClick.bind(this);
        this.state = {
            "patients" : 0,
            "appointments" : 0,
            "doctors" : 0,
            "attendedAppointMent" : 0,
            "pendingAppointMent" : 0,
            "isDoctorClicked" : false,
            "isListClicked" : false,
            "isInvoiceCLicked" : false,
            "isDashBoardScreen" : true, //Set it false before redirecting any other screen
            "listPageName" : "Patients"
        }
    }
    componentDidMount(){
        //TODO: Make API call and get details of dashboard
        this.setState({isDashBoardScreen : true});
        this.setState({isDoctorClicked: false});
        this.setState({isListClicked:false});
        // Here setState is asynchronous function so when setState is done after callabck we are updating next value
        this.setState({patients : 200, appointments:700, attendedAppointMent:110, doctors:2}, function(){
            let pending = this.state.appointments - this.state.attendedAppointMent;
            this.setState({pendingAppointMent:pending})
        });
    }

    handleDivClick(props){
        this.setState({isDashBoardScreen : false}); // Disable current screen
        switch(props.id){
            case "doctors": 
                this.setState({isDoctorClicked: true});
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
            this.setState({isDashBoardScreen : true});
                //NOthing to do    
        }
    }
    render(){
        return (
            <div>
                {this.state.isDoctorClicked && (
                    <Doctors />
                )}
                {this.state.isListClicked && (
                    <ListView page={this.state.listPageName}/>
                )} 
                {this.state.isInvoiceCLicked && (
                    <InvoiceList />
                )} 
            {this.state.isDashBoardScreen && (
            <div className="topView">
                <div className="header">
                    <img src="/icons8-doctors-bag-48.png" alt="" className="headerImage"></img>
                    <label className="headerLabel" > My Clinic</label>
                </div>
                <div className="menuView">
                    <div className="menuList">
                        <img src="/icons8-dashboard-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel" id="dashboardLabel"> Dashboard</label><br/><br/>
                    </div>
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "doctors"})}>
                        <img src="/icons8-medical-doctor-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Doctors</label><br/><br/> 
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
                <div className="dashboardView">
                   <div className="dashboardBlock1">
                        <div className="blockImageDiv">
                            <img src="/icons8-medical-doctor-64.png" alt="" className="blockImage"></img>
                        </div>
                        <div className="blockCountLabelDiv">
                            <label className="blockLabel">{this.state.doctors}</label>
                        </div>
                        <div className="blockNameLabelDiv">
                            <label className="blockLabel1" >Doctors</label>
                        </div>
                   </div>
                   <div className="dashboardBlock2">
                        <div className="blockImageDiv">
                            <img src="/icons8-hospital-bed-64.png" alt="" className="blockImage"></img>
                        </div>
                        <div className="blockCountLabelDiv">
                            <label className="blockLabel">{this.state.patients}</label>
                        </div>
                        <div className="blockNameLabelDiv">
                            <label className="blockLabel1" >Patients</label>
                        </div>
                   </div>
                   <div className="dashboardBlock3">
                        <div className="blockImageDiv">
                            <img src="/icons8-planner-64.png" alt="" className="blockImage"></img>
                        </div>
                        <div className="blockCountLabelDiv">
                            <label className="blockLabel">{this.state.appointments}</label>
                        </div>
                        <div className="blockNameLabelDiv">
                            <label className="blockLabel1" >Appointments</label>
                        </div>
                        <div className="dashboardBlock4">
                        <div className="blockImageDiv">
                            <img src="/icons8-stethoscope-64.png" alt="" className="blockImage"></img>
                        </div>
                        <div className="blockCountLabelDiv">
                            <label className="blockLabel">{this.state.attendedAppointMent}</label>
                        </div>
                        <div className="blockNameLabelDiv">
                            <label className="blockLabel1" >Attended</label>
                        </div>
                   </div>
                   <div className="dashboardBlock5">
                        <div className="blockImageDiv">
                            <img src="/icons8-heart-health-64.png" alt="" className="blockImage"></img>
                        </div>
                        <div className="blockCountLabelDiv">
                            <label className="blockLabel">{this.state.pendingAppointMent}</label>
                        </div>
                        <div className="blockNameLabelDiv">
                            <label className="blockLabel1" >Pending</label>
                        </div>
                   </div>
                   </div>
                </div>
            </div> )}
            </div>
        )
    }
}

export default Dashboard;