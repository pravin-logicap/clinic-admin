import React from "react";
import "./addDetails.css";
import Grid from "@material-ui/core/Grid";
import Dashboard from "../dashboard/dashboard";
import Doctors from "../doctors/doctors";
import ListView from "../listView/listView";

class AddDetails extends React.Component{
    constructor(props){
        super(props);
        let lastPage = props.previousPage;
        this.handleDivClick = this.handleDivClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlefNameChange = this.handlefNameChange.bind(this);
        this.handlelNameChange = this.handlelNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        
        this.state = {
            "previousPage" : lastPage,
            "isDashBoardClicked" : false,
            "isDoctorClicked" : false,
            "isListClicked" : false,
            "openInreadMode" : props.mode,
            "isAddEditScreen" : true, //Set it false before redirecting any other screen
            "headerLabel" : props.mode ? "" : "Add/Edit ",
            "userData" : {
                "fName" : "",
                "lName" : "",
                "age" : "",
                "gender" : "",
                "address" : "",
                "phone" : "",
                "email" : ""
            }
        }
        console.log("mode >>>>>>>>>> "+props.mode)
    }
    componentDidMount(){
        
    }
    handlefNameChange(event){
        this.setState({userData : {fName: event.target.value}});
    }
    handlelNameChange(event){
        this.setState({userData : {lName: event.target.value}});
    }
    handleAgeChange(event){
        this.setState({userData : {age: event.target.value}});
    }
    handleGenderChange(event){
        this.setState({userData : {gender: event.target.value}});
    }
    handleAddressChange(event){
        this.setState({userData : {address: event.target.value}});
    }
    handlePhoneChange(event){
        this.setState({userData : {phone: event.target.value}});
    }
    handleEmailChange(event){
        this.setState({userData : {email: event.target.value}});
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({isAddEditScreen : true});
    }
    handleDivClick(props){
        this.setState({isAddEditScreen : false}); // Disable current screen
        switch(props.id){
            case "dashboard": 
                this.setState({isDashBoardClicked: true});
                break;
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
            default : 
            this.setState({isAddEditScreen : true}); // By default set true same screen
        }
    }
    render(){
        return (
            <div>
            {this.state.isAddEditScreen && (
                <div className="topView" id="AddDetailsTopView">
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
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "appointments"})}>
                        <img src="/icons8-planner-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel" id={this.state.previousPage === "Appointments" ? "appointmentsLabel" : ""}> Appointments</label><br/><br/>
                    </div>
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "patients"})}>
                        <img src="/icons8-hospital-bed-64.png" alt="" className="menuIcon"></img>
                       <label className="menuLabel" id={this.state.previousPage === "Patients" ? "patientLabel" : ""}>Patients</label><br/><br/>
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
                 {this.state.previousPage==="Appointments" && (
                 <div className="addDetailsView">
                    <div>
                    <div className="pageHeader">
                        <label className="pageHeaderLabel" id="headerLableForAdd">{this.state.headerLabel} Appointments</label>
                    </div>
                        <div className="inputFullOuterView">
                        <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={2} className="grid">
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">First Name</label>
                                <input type="text" onChange={this.handlefNameChange} value={this.state.userData.fName} placeholder="First Name" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Last Name</label>
                                <input type="text" onChange={this.handlelNameChange} value={this.state.userData.lName} placeholder="Last Name" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Age</label>
                                <input type="number" onChange={this.handleAgeChange} value={this.state.userData.age} placeholder="Age" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                
                            <label className="inputLabel">Gender</label>
                                <select className="gender" onChange={this.handleGenderChange} value={this.state.userData.gender} readOnly={this.state.openInreadMode}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="transgender">Transgender</option>
                                    <option value="na">Don't want to mention</option>
                                </select>
                                
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Address</label>
                                <input type="text" onChange={this.handleAddressChange} value={this.state.userData.address} placeholder="Address" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Phone</label>
                                <input type="number" onChange={this.handlePhoneChange} value={this.state.userData.phone} placeholder="Phone" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Email</label>
                                <input type="email" onChange={this.handleEmailChange} value={this.state.userData.email} placeholder="Email" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                        </Grid>
                        <div className="inputBoxOuterView" id="submitButtonView" style={{visibility: (this.state.openInreadMode ? "hidden" : "visible")}}>
                            <button type= "submit" value="submit" className="button" id="addEditDetail">
                                Submit
                            </button>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
                 )}
                 {this.state.previousPage==="Patients" && (
                 <div className="addDetailsView">
                    <div>
                    <div className="pageHeader">
                        <label className="pageHeaderLabel" id="headerLableForAdd"> {this.state.headerLabel} Patients</label>
                    </div>
                        <div className="inputFullOuterView">
                        <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={2} className="grid">
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">First Name</label>
                                <input type="text" onChange={this.handlefNameChange} value={this.state.userData.fName} placeholder="First Name" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Last Name</label>
                                <input type="text" onChange={this.handlelNameChange} value={this.state.userData.lName} placeholder="Last Name" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Age</label>
                                <input type="number" onChange={this.handleAgeChange} value={this.state.userData.age} placeholder="Age" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                
                            <label className="inputLabel">Gender</label>
                                <select className="gender" onChange={this.handleGenderChange} value={this.state.userData.gender} readOnly={this.state.openInreadMode}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="transgender">Transgender</option>
                                    <option value="na">Don't want to mention</option>
                                </select>
                                
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Address</label>
                                <input type="text" onChange={this.handleAddressChange} value={this.state.userData.address} placeholder="Address" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Phone</label>
                                <input type="number" onChange={this.handlePhoneChange} value={this.state.userData.phone} placeholder="Phone" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Email</label>
                                <input type="email" onChange={this.handleEmailChange} value={this.state.userData.email} placeholder="Email" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Admitted On</label>
                                <input type="datetime-local" onChange={this.handleEmailChange} value={this.state.userData.email} placeholder="Date" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div className="inputBoxOuterView">
                                <label className="inputLabel">Admitted for/ Reason</label>
                                <input type="text" onChange={this.handleEmailChange} value={this.state.userData.email} placeholder="Reason" className="userinputbox" readOnly={this.state.openInreadMode}></input>
                            </div>
                            <div id="inputBoxOuterViewTextArea" className="inputBoxOuterView">
                                <label className="inputLabel">Treatment</label>
                                <textarea id="textAreaInput" onChange={this.handleEmailChange} value={this.state.userData.email} placeholder="Treatment" className="userinputbox" readOnly={this.state.openInreadMode}></textarea>
                            </div>
                            <div className="inputBoxOuterView">
                                
                            <label className="inputLabel">Status</label>
                                <select className="gender" onChange={this.handleGenderChange} value={this.state.userData.gender} readOnly={this.state.openInreadMode}>
                                    <option value="admitted">admitted</option>
                                    <option value="discharged">discharged</option>
                                    <option value="regular">regular</option>
                                    <option value="na">NA</option>
                                </select>
                                
                            </div>
                        </Grid>
                        <div className="inputBoxOuterView" id="submitButtonView" style={{visibility: (this.state.openInreadMode ? "hidden" : "visible")}}>
                            <button type= "submit" value="submit" className="button" id="addEditDetail">
                                Submit
                            </button>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
                 )}
                </div> )}
                {this.state.isDashBoardClicked && (
                    <Dashboard />
                )}
                {this.state.isDoctorClicked && (
                    <Doctors />
                )}
                {this.state.isListClicked && (
                    <ListView page={this.state.listPageName}/>
                )}
            </div>
        )
    }
}


export default AddDetails;