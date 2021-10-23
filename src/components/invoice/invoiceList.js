import React from "react";
import "./invoiceList.css";
import Dashboard from "../dashboard/dashboard";
import Doctors from "../doctors/doctors";
import ListView from "../listView/listView";
import AddEditInvoice from "../addEditInvoice/addEditInvoice";
class InvoiceList extends React.Component{
    constructor(props){
        super(props);
        this.handleDivClick = this.handleDivClick.bind(this);
        this.handleListClick = this.handleListClick.bind(this);

        this.state = {
            "isDashBoardClicked" : false,
            "addAppointmentClicked" : false,
            "addPatientClicked" : false,
            "readOnlyMode" : false, // open next details screen for Addrdit mode or read only mode. Depend of this flag for next page
            "isDoctorClicked" : false,
            "isListScreen" : false, //Set it false before redirecting any other screen
            "isInvoiceCLicked" : true,
            "isAddEditInvoiceClicked" : false,
            "doctorsList" : [],
            "count" : 0,
            "selectedListItem" : {},
            "listPageName" : "Patients"
        }
    }
    componentDidMount(){
        
    }
    handleListClick(e, item) {
        console.log("e >> ",e)
        e.preventDefault();
        if(e.target.id  !== "Invoice Number"){
            // open new view
            this.setState({isInvoiceCLicked : false}); // Disable current screen
            this.setState({isAddEditInvoiceClicked: true});

            this.setState({selectedListItem: item}); //Append Item to send to next screen
        }
        // Open invoice details and edit
        
    }
    handleDivClick(props){
        this.setState({isInvoiceCLicked : false}); // Disable current screen
        switch(props.id){
            case "dashboard": 
                this.setState({isDashBoardClicked: true});
                break;
            case "doctors": 
                this.setState({isDoctorClicked: true});
                break;
            case "appointmentsList": //This is same page but if user is on Patients tab (We are using same screen for 2 tab appointment and patients)
                this.setState({isListScreen: true});
                this.setState({listPageName : "Appointments"});
                break;
            case "patientsList": ////This is same page but if user is on Appointment tab (We are using same screen for 2 tab appointment and patients)
                    this.setState({isListScreen: true});
                    this.setState({listPageName : "Patients"})
                    break;
            case "addEditInvoice": 
                    this.setState({isAddEditInvoiceClicked: true});
                    break;
            default : 
                this.setState({isInvoiceCLicked : true}); // By default set true same screen
        }
    }
    render(){
        return (
            <div>
                {this.state.isDashBoardClicked && (
                    <Dashboard />
                )}
                {this.state.isListScreen && (
                    <ListView page = {this.state.listPageName}/>
                )}
                {this.state.isDoctorClicked && (
                    <Doctors />
                )}
                {this.state.isAddEditInvoiceClicked && (
                    <AddEditInvoice listItem={this.state.selectedListItem}/>
                )}
            {this.state.isInvoiceCLicked && (
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
                        <label className="menuLabel"> Appointments</label><br/><br/>
                    </div>
                    <div className="menuList"  onClick={(e) => this.handleDivClick({ "id" : "patientsList"})}>
                        <img src="/icons8-hospital-bed-64.png" alt="" className="menuIcon"></img>
                       <label className="menuLabel">Patients</label><br/><br/>
                    </div>
                    <div className="menuList">
                        <img src="/icons8-bill-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel" id="invoiceListLabel"> Invoice</label><br/><br/>
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
                    <label className="pageHeaderLabel" id="addEditButton">Create New Invoice</label>
                </div>
                <div className="listViewOuterView">
                    <ListingData listingFunction={this.handleListClick} />
                </div>
                </div>  
            )}
            
        </div>
        )
    }
}

function PageTitle(props){
    return(
    <div className="pageHeader">
       <label className="pageHeaderLabel"> Invoices</label>
    </div>
    );
}


function ListingData(props){
    let invoices = [
        {
            "invoiceNumber" : "Invoice Number",
            "patientName" : "Patient Name",
            "createdDate" : "Created Date",
            "dueDatege" : "Due Date",
            "billAmount" : "Bill Amount",
            "paidAmount" : "Paid Amount",
            "status" : "Status",
            "expense" : []
    
        },
        {
            "invoiceNumber" : "#123",
            "patientName" : "Ram Gopal",
            "createdDate" : "Tue, 18-Oct-2021 12:30 PM",
            "dueDatege" : "Tue, 18-Oct-2021 12:30 PM",
            "billAmount" : "9819",
            "paidAmount" : "5000",
            "status" : "Partially Paid",
            "expense" : [
                {
                    "id" : 1,
                    "itemName" : "Full Body Checkup",
                    "description" : "if any and check long text what happen by default where it's increasing or showing ellipsis in text box",
                    "unitPrice" : "150",
                    "qty" : "3",
                    "total" : "450"
                },
                {
                    "id" : 2,
                    "itemName" : "Shuger Test",
                    "description" : "if any",
                    "unitPrice" : "200",
                    "qty" : "1",
                    "total" : "200"
                },
                {
                    "id" : "",
                    "itemName" : "",
                    "description" : "",
                    "unitPrice" : "",
                    "qty" : "",
                    "total" : ""
                }
            ]
    
        },
        {
            "invoiceNumber" : "#124",
            "patientName" : "Suman Gupta",
            "createdDate" : "Tue, 16-Sept-2021 12:30 PM",
            "dueDatege" : "Tue, 18-Sept-2021 12:30 PM",
            "billAmount" : "6000",
            "paidAmount" : "6000",
            "status" : "Paid",
            "expense" : [
                {
                    "id" : 1,
                    "itemName" : "Full Body Checkup",
                    "description" : "if any",
                    "unitPrice" : "150",
                    "qty" : "3",
                    "total" : "450"
                },
                {
                    "id" : 2,
                    "itemName" : "Shuger Test",
                    "description" : "if any",
                    "unitPrice" : "200",
                    "qty" : "1",
                    "total" : "200"
                }
            ]
    
        },
        {
            "invoiceNumber" : "#125",
            "patientName" : "Ram Gopal",
            "createdDate" : "Tue, 18-Oct-2021 12:30 PM",
            "dueDatege" : "Tue, 18-Oct-2021 12:30 PM",
            "billAmount" : "9819",
            "paidAmount" : "5000",
            "status" : "Partially Paid",
            "expense" : [
                {
                    "id" : 1,
                    "itemName" : "Full Body Checkup",
                    "description" : "if any",
                    "unitPrice" : "150",
                    "qty" : "3",
                    "total" : "450"
                },
                {
                    "id" : 2,
                    "itemName" : "Shuger Test",
                    "description" : "if any",
                    "unitPrice" : "200",
                    "qty" : "1",
                    "total" : "200"
                }
            ]
    
        },
        {
            "invoiceNumber" : "#123",
            "patientName" : "Ram Gopal",
            "createdDate" : "Tue, 18-Oct-2021 12:30 PM",
            "dueDatege" : "Tue, 18-Oct-2021 12:30 PM",
            "billAmount" : "9819",
            "paidAmount" : "5000",
            "status" : "Partially Paid",
            "expense" : [
                {
                    "id" : 1,
                    "itemName" : "Full Body Checkup",
                    "description" : "if any",
                    "unitPrice" : "150",
                    "qty" : "3",
                    "total" : "450"
                },
                {
                    "id" : 2,
                    "itemName" : "Shuger Test",
                    "description" : "if any",
                    "unitPrice" : "200",
                    "qty" : "1",
                    "total" : "200"
                }
            ]
    
        },
        {
            "invoiceNumber" : "#123",
            "patientName" : "Ram Gopal",
            "createdDate" : "Tue, 18-Oct-2021 12:30 PM",
            "dueDatege" : "Tue, 18-Oct-2021 12:30 PM",
            "billAmount" : "9819",
            "paidAmount" : "5000",
            "status" : "Partially Paid",
            "expense" : [
                {
                    "id" : 1,
                    "itemName" : "Full Body Checkup",
                    "description" : "if any",
                    "unitPrice" : "150",
                    "qty" : "3",
                    "total" : "450"
                },
                {
                    "id" : 2,
                    "itemName" : "Shuger Test",
                    "description" : "if any",
                    "unitPrice" : "200",
                    "qty" : "1",
                    "total" : "200"
                }
            ]
    
        },
        {
            "invoiceNumber" : "#123",
            "patientName" : "Ram Gopal",
            "createdDate" : "Tue, 18-Oct-2021 12:30 PM",
            "dueDatege" : "Tue, 18-Oct-2021 12:30 PM",
            "billAmount" : "9819",
            "paidAmount" : "5000",
            "status" : "Partially Paid",
            "expense" : [
                {
                    "id" : 1,
                    "itemName" : "Full Body Checkup",
                    "description" : "if any",
                    "unitPrice" : "150",
                    "qty" : "3",
                    "total" : "450"
                },
                {
                    "id" : 2,
                    "itemName" : "Shuger Test",
                    "description" : "if any",
                    "unitPrice" : "200",
                    "qty" : "1",
                    "total" : "200"
                }
            ]
    
        },
        {
            "invoiceNumber" : "#123",
            "patientName" : "Ram Gopal",
            "createdDate" : "Tue, 18-Oct-2021 12:30 PM",
            "dueDatege" : "Tue, 18-Oct-2021 12:30 PM",
            "billAmount" : "9819",
            "paidAmount" : "5000",
            "status" : "Partially Paid",
            "expense" : [
                {
                    "id" : 1,
                    "itemName" : "Full Body Checkup",
                    "description" : "if any",
                    "unitPrice" : "150",
                    "qty" : "3",
                    "total" : "450"
                },
                {
                    "id" : 2,
                    "itemName" : "Shuger Test",
                    "description" : "if any",
                    "unitPrice" : "200",
                    "qty" : "1",
                    "total" : "200"
                }
            ]
    
        },
        {
            "invoiceNumber" : "#123",
            "patientName" : "Ram Gopal",
            "createdDate" : "Tue, 18-Oct-2021 12:30 PM",
            "dueDatege" : "Tue, 18-Oct-2021 12:30 PM",
            "billAmount" : "9819",
            "paidAmount" : "5000",
            "status" : "Partially Paid",
            "expense" : [
                {
                    "id" : 1,
                    "itemName" : "Full Body Checkup",
                    "description" : "if any",
                    "unitPrice" : "150",
                    "qty" : "3",
                    "total" : "450"
                },
                {
                    "id" : 2,
                    "itemName" : "Shuger Test",
                    "description" : "if any",
                    "unitPrice" : "200",
                    "qty" : "1",
                    "total" : "200"
                }
            ]
    
        }
    ]
        return invoiceListing(props, 0, invoices);
}
function invoiceListing(props, count, invoices){
    return(
        <div className="list">
            
               <div className="liClass1">
            {invoices.map((item) =>
                <div className="liClass2">
                    <div className="listDiv1" style={{backgroundColor: (item.invoiceNumber==="Invoice Number") ? "#C0C0C0" : (count%2===0?"#DCDCDC" : "#C0C0C0")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{(item.invoiceNumber==="Invoice Number")? "Sr No" : count+=1}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{item.invoiceNumber}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{item.patientName}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{item.createdDate}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{item.dueDatege}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>₹ {item.billAmount}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>₹ {item.paidAmount}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{item.status}</label>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}
export default InvoiceList;