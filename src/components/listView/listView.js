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
                 <div className="pageTitle">
                    <PageTitle pageName={this.state.selectedPageName} />
                </div>
                <div className="listViewOuterView">
                    <ListingData pageName={this.state.selectedPageName}/>
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

function ListingData(props){
    //TODO: make API call to fetch list of given type
    let pageType = props.pageType;

    let appointments = [
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
    return(
        <div className="list">
            <ol type="1" start="1">
            {appointments.map((item) =>
                <li className ="liClass">
                    <div className="listDiv1">
                        <label className="listLabel">{item.name}</label>
                    </div>
                    <div className="listDiv1">
                        <label className="listLabel">{item.address}</label>
                    </div>
                    <div className="listDiv1">
                        <label className="listLabel">{item.age}</label>
                    </div>
                    <div className="listDiv1">
                        <label className="listLabel">{item.appointment_doctor}</label>
                    </div>
                    <div className="listDiv1">
                        <label className="listLabel">{item.date_and_timing}</label>
                    </div>
                </li>
            )}
            </ol>
        </div>
    )
}
export default ListView;