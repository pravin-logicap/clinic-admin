import React from "react";
import "./addEditInvoice.css";
import Dashboard from "../dashboard/dashboard";
import Doctors from "../doctors/doctors";
import ListView from "../listView/listView";
import InvoiceList from "../invoice/invoiceList";
class AddEditInvoice extends React.Component{
    constructor(props){
        super(props);
        this.handleDivClick = this.handleDivClick.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
        console.log("Edit invoice here >>>>>>>>>>>>> ",props.listItem);
        this.state = {
            "isDashBoardClicked" : false,
            "addAppointmentClicked" : false,
            "addPatientClicked" : false,
            "readOnlyMode" : false, // open next details screen for Addrdit mode or read only mode. Depend of this flag for next page
            "isDoctorClicked" : false,
            "isListScreen" : false, //Set it false before redirecting any other screen
            "isInvoiceCLicked" : false,
            "doctorsList" : [],
            "addEditInvoiceClicked" : true,
            "count" : 0,
            "listPageName" : "Patients",
            "userInvoice" : {
                "invoiceNumber" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.invoiceNumber : "",
                "patientName" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.patientName : "",
                "createdDate" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.createdDate : "",
                "dueDatege" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.dueDatege : "",
                "billAmount" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.billAmount : "",
                "paidAmount" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.paidAmount : "",
                "status" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.status : "",
                "expense" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.expense : "",
            }
        }
    }
    componentDidMount(){
        
    }
    handleListClick(e, item) {
        console.log("e >> ",e)
        e.preventDefault();
        if(e.target.id  !== "Invoice Number"){
            // open new view
        }
        // Open invoice details and edit
        
    }
    handleDivClick(props){
        this.setState({addEditInvoiceClicked : false}); // Disable current screen
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
            case "invoice":
                    this.setState({isInvoiceCLicked:true});
                    break;
            default : 
                this.setState({addEditInvoiceClicked : true}); // By default set true same screen
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
                {this.state.isInvoiceCLicked && (
                    <InvoiceList />
                )}
            {this.state.addEditInvoiceClicked && (
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
                    <div className="menuList" onClick={(e) => this.handleDivClick({ "id" : "invoice"})}>
                        <img src="/icons8-bill-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel" id="invoiceListLabel"> Invoice</label><br/><br/>
                    </div>
                    <div className="menuList">
                        <img src="/icons8-pills-64.png" alt="" className="menuIcon"></img>
                        <label className="menuLabel"> Prescription</label><br/><br/>
                    </div>
                 </div>
                 <div className="pageTitle">
                 <div className="pageHeader">
                    <label className="pageHeaderLabel"> Invoices Details</label>
                 </div>
                </div>
                 <div className="listViewOuterView">
                    <ListingData listingFunction={this.handleListClick} userInvoice={this.state.userInvoice}/>
                </div>
                </div>  
            )}
            
        </div>
        )
    }
}



function ListingData(props){
    let invoiceExpenseList = props.userInvoice.expense;
    console.log("invoiceExpenseList 1111>> ",invoiceExpenseList)
    let HeaderObj =  {
                "id" : "Invoice Number",
                "itemName" : "Item",
                "description" : "Description",
                "unitPrice" : "Unit Cost",
                "qty" : "Qty",
                "total" : "Amount",
                "status" : "Status",
        };
        console.log("invoiceExpenseList[0].id >>>>>>> ",invoiceExpenseList[0].id)
        if(invoiceExpenseList[0].id !== "Invoice Number"){
            invoiceExpenseList.unshift(HeaderObj); //Append this header object at top
        }
        
        //invoiceExpenseList.splice(0,0);
        console.log("invoiceExpenseList >> ",invoiceExpenseList)
        return invoiceExpenses(props, 0, invoiceExpenseList);
}
function invoiceExpenses(props, count, invoices){
    return(
        <div className="list">
            
               <div className="liClass1">
            {invoices.map((item) =>
                <div className="liClass2">
                    <div className="listDiv1" style={{backgroundColor: (item.id==="Invoice Number") ? "#C0C0C0" : (count%2===0?"#DCDCDC" : "#C0C0C0")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{(item.id==="Invoice Number")? "Sr No" : count+=1}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{item.id}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{item.itemName}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>{item.description}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>₹ {item.unitPrice}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}> {item.qty}</label>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <label className="listLabel" id={item.invoiceNumber} onClick={(e) => props.listingFunction(e, item)}>₹ {item.total}</label>
                    </div> 
                </div>
            )}
            </div>
        </div>
    )
}
export default AddEditInvoice;