import React from "react";
import "./listView.css";
import Dashboard from "../dashboard/dashboard";
import Doctors from "../doctors/doctors";
import AddDetails from "../addDetails/addDetails";
class ListView extends React.Component{
    constructor(props){
        super(props);
        this.handleDivClick = this.handleDivClick.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
        // Expect page as pageName from previous component. This component can be reused for different menu.
        let pageName = props.page;
        console.log("Page Name >> ",pageName);
        this.state = {
            "isDashBoardClicked" : false,
            "addAppointmentClicked" : false,
            "addPatientClicked" : false,
            "readOnlyMode" : false, // open next details screen for Addrdit mode or read only mode. Depend of this flag for next page
            "isDoctorClicked" : false,
            "isListScreen" : true, //Set it false before redirecting any other screen
            "doctorsList" : [],
            "selectedPageName" : pageName,
            "count" : 0,
            "selectedListItem" : {}
        }
    }
    componentDidMount(){
        
    }
    handleListClick(e, item) {
        console.log("e >> ",e)
        e.preventDefault();
        if(e.target.id  !== "Name"){ // Ignore header line, add all redirect logic heare
            this.setState({isListScreen : false}); // Disable current screen
            this.setState({readOnlyMode : true}); // based on this, open next file in read mode 
            
            this.setState({selectedListItem: item});
            if(this.state.selectedPageName === "Patients"){
                this.setState({addPatientClicked: true});
            }else{
               
                this.setState({addAppointmentClicked: true});
            }
            
        }
        
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
            case "Appointments": //This is for add/create
                this.setState({addAppointmentClicked: true});
                break;
            case "Patients": //This is for add/create
                    this.setState({addPatientClicked: true});
                    break;
            case "appointmentsList": //This is same page but if user is on Patients tab (We are using same screen for 2 tab appointment and patients)
                this.setState({isListScreen: true});
                this.setState({selectedPageName : "Appointments"});
                break;
            case "patientsList": ////This is same page but if user is on Appointment tab (We are using same screen for 2 tab appointment and patients)
                    this.setState({isListScreen: true});
                    this.setState({selectedPageName : "Patients"})
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
            {this.state.addAppointmentClicked && (
                <AddDetails previousPage={"Appointments"} mode={this.state.readOnlyMode} listItem={this.state.selectedListItem}/>
            )}
            {this.state.addPatientClicked && (
                <AddDetails previousPage={"Patients"} mode={this.state.readOnlyMode} listItem={this.state.selectedListItem}/>
            )}
            {this.state.isListScreen && (
                <div className="topView1">
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
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "appointmentsList"})}>
                        <img src="/icons8-planner-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel" id={this.state.selectedPageName === "Appointments" ? "appointmentsLabel" : ""}> Appointments</label><br/><br/>
                    </div>
                    <div className="menuList"  onClick={(e) => this.handleDivClick({ "id" : "patientsList"})}>
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
                 <div className="pageTitle">
                    <PageTitle pageName={this.state.selectedPageName} />
                </div>
                <div className="addEditView" onClick={()=> this.handleDivClick({id:this.state.selectedPageName})}>
                    <img src="/icons8-add-48.png" alt="" className="addEditImageView"></img>
                    <label className="pageHeaderLabel" id="addEditButton">Add {this.state.selectedPageName} </label>
                </div>
                <div className="listViewOuterView">
                    <ListingData listingFunction={this.handleListClick} pageName={this.state.selectedPageName} count={0}/>
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


function ListingData(props, page){
    //TODO: make API call to fetch list of given type
    let pageName = props.pageName;
    console.log("props >> ",props)
    let count = props.count;
    let appointments = [
        {
            "name" : "Name",
            "address" : "Address",
            "appointment_doctor" : "Doctor",
            "age" : "Age",
            "phone" : "Phone",
            "email" : "Email",
            "date_and_timing" : "Date and time"
    
        },
        {
        "name" : "Lorem ipsum",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    },
    {
        "name" : "Sam ipsum",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    },
    {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    },
    {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    },
    {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }, {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }, {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }, {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }, {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }, {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }, {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }, {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }, {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    },
    {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    },
    {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    },
    {
        "name" : "Jon Doe",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    },
    {
        "name" : "Lorem Sam",
        "address" : "London",
        "appointment_doctor" : "Dr Amit Bhapkar",
        "age" : "35",
        "phone" : "1122333",
        "email" : "test@abc.com",
        "date_and_timing" : "Tue, 18-Oct-2021 12:30 PM"

    }]
    if(pageName==="Appointments"){
        return appointmentListing(props, count, appointments)
    }else{
        return patientListing(props, count, appointments);
    }
}

function appointmentListing(props, count, appointments){
    return(
        <div className="list">
            
               <div className="liClass1">
            {appointments.map((item) =>
                <div className="liClass2">
                    <div className="listDiv1" id={item.name} style={{backgroundColor: (item.name==="Name") ? "#C0C0C0" : (count%2===0?"#DCDCDC" : "#C0C0C0")}} >
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{(item.name==="Name")? "Sr No" : count+=1}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)} >{item.name}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)} >{item.phone}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.address}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.age}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.appointment_doctor}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.date_and_timing}</label>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}
function patientListing(props, count, appointments){
    return(
        <div className="list">
            
               <div className="liClass1">
            {appointments.map((item) =>
                <div className="liClass2">
                    <div className="listDiv1" style={{backgroundColor: (item.name==="Name") ? "#C0C0C0" : (count%2===0?"#DCDCDC" : "#C0C0C0")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{(item.name==="Name")? "Sr No" : count+=1}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.name}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.phone}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.email}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.address}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.age}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.appointment_doctor}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.name} onClick={(e) => props.listingFunction(e, item)}>{item.date_and_timing}</label>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}
export default ListView;