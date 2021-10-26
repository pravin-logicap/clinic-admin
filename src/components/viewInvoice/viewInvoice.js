import React from "react";
import "./viewInvoice.css";
import Dashboard from "../dashboard/dashboard";
import Doctors from "../doctors/doctors";
import ListView from "../listView/listView";
import InvoiceList from "../invoice/invoiceList";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import has from 'lodash/has';
class ViewInvoice extends React.Component{
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
                "dueDate" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.dueDate : "",
                "billAmount" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.billAmount : "",
                "paidAmount" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.paidAmount : "",
                "status" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.status : "",
                "expense" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.expense : "",
                "hospitalInfo" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.hospitalInfo : "",
                "patientInfo" : (props.listItem!== null && props.listItem !== undefined) ? props.listItem.patientInfo : "",
            }
        }
    }
    componentDidMount(){
        
    }
    printDocument() {
        html2canvas(document.querySelector("#billOuterView")).then(canvas => {
            //document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10,10,190,200);
            pdf.save("download.pdf"); 
        });
      }
    handleListClick(e, item, itemIndex) {
        console.log("e >> ",e.target)
        console.log("index >> ",itemIndex)
        e.preventDefault();
        /*if(e.target.id  !== "Invoice Number"){
           // this.setState({userInvoice : { expense : {[e.target.id] : {itemName : e.target.value}}} })
        }*/
        let currentInvoice = this.state.userInvoice;
        for(let i = 1; i<= currentInvoice.expense.length; i++){
            console.log("i is >> ",i);
            console.log("id is >> ",e.target.id);
            if( i == e.target.id){
                console.log("Changing value >> ",currentInvoice.expense.length)
                currentInvoice.expense[i][e.target.name] = e.target.value;
            }
        }
        this.setState({userInvoice: currentInvoice})

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
                <div className="topView1" id="invoiceTopView">
                    <div className="header">
                        <img src="/icons8-doctors-bag-48.png" alt="" className="headerImage"></img>
                        <label className="headerLabel" > My Clinic</label>
                    </div>
                    <div className="menuView" id="invoiceMenuId">
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
                        <label className="menuLabel" id="invoiceexpenseInputBox"> Invoice</label><br/><br/>
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
                <div id="billOuterView">
                    <div className="invoiceUpperView" id="invoicePrintView">
                                <div className="inputBoxOuterViewInvoice1" >
                                    <label className="inputLabelInvoice" id="printViewInvoice1"><b>{this.state.userInvoice.hospitalInfo.name}</b>, <br/>{this.state.userInvoice.hospitalInfo.address}, <br/> GST No: {this.state.userInvoice.hospitalInfo.GSTNo} </label> 
                                </div>
                                <div className="inputBoxOuterViewInvoice1" id="inputBoxOuterViewInvoice2">
                                    <label className="inputLabelInvoice" id="printViewInvoice1"><b>INVOICE: {this.state.userInvoice.invoiceNumber}</b>, <br/>&nbsp;&nbsp; Date: {this.state.userInvoice.createdDate} <br/>&nbsp;&nbsp; Due Date: {this.state.userInvoice.dueDate}</label> 
                                </div>
                                <div className="inputBoxOuterViewInvoice1" id="inputBoxOuterViewInvoice3">
                                    <label className="inputLabelInvoice" id="printViewInvoice1"><b>Invoice To:<br/>{this.state.userInvoice.patientInfo.fName} {this.state.userInvoice.patientInfo.lName}<br/></b>{this.state.userInvoice.patientInfo.address} <br/>contact: {this.state.userInvoice.patientInfo.contact} </label> 
                                </div>
                                <div className="inputBoxOuterViewInvoice1" id="inputBoxOuterViewInvoice4">
                                    <label className="inputLabelInvoice" id="printViewInvoice1"></label> 
                                </div>
                    </div>
                    <div className="listViewOuterView" id="listViewOuterPrintViewInvoice">
                        <ListingData listingFunction={this.handleListClick} printFunction={this.printDocument} userInvoice={this.state.userInvoice}/>
                    </div>
                </div>
                </div>  
            )}
            
        </div>
        )
    }
}



function ListingData(props){
    let invoiceExpenseList = props.userInvoice;
    console.log("invoiceExpenseList 1111>> ",invoiceExpenseList)
    let HeaderObj =  {
                "id" : "Invoice Number",
                "itemName" : "Item",
                "description" : "Description",
                "unitPrice" : "₹ Unit Cost",
                "qty" : "Qty",
                "total" : "₹ Amount",
                "status" : "Status",
        };
        console.log("invoiceExpenseList[0].id >>>>>>> ",invoiceExpenseList)
        if((has(invoiceExpenseList,"expense") && invoiceExpenseList.expense.length===0) || invoiceExpenseList.expense[0].id !== "Invoice Number"){
            invoiceExpenseList.expense.unshift(HeaderObj); //Append this header object at top
        }
        
        //invoiceExpenseList.splice(0,0);
        console.log("invoiceExpenseList >> ",invoiceExpenseList)
        return invoiceExpenses(props, 0, invoiceExpenseList);
}
function invoiceExpenses(props, count, invoices){
    return(
        <div className="list">
            
               <div className="liClass111" id="listClassId" >
            {invoices.expense.map((item) =>
                <div className="liClass2">
                    <div className="listDiv1" style={{backgroundColor: (item.id==="Invoice Number") ? "#C0C0C0" : (count%2===0?"#DCDCDC" : "#C0C0C0")}}>
                        <input type="text" className="expenseInputBox" id={props.userInvoice.expense[count].id} onClick={(e) => props.listingFunction(e, item)} value={(item.id==="Invoice Number")? "Sr No" : count+=1}></input>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <input type="text" className="expenseInputBox" id={props.userInvoice.expense[count].id} onChange={(e) => props.listingFunction(e, item, count)} value={(item.id==="Invoice Number")? "Invoice No." : invoices.invoiceNumber}></input>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <input type="text" className="expenseInputBox" id={props.userInvoice.expense[count].id} onChange={(e) => props.listingFunction(e, item, count)} value={props.userInvoice.expense[count].itemName} name="itemName"></input>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <input type="text" className="expenseInputBox" id={props.userInvoice.expense[count].id} onChange={(e) => props.listingFunction(e, item, count)} value={props.userInvoice.expense[count].description} name="description"></input>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <input type="text" className="expenseInputBox" id={props.userInvoice.expense[count].id} onChange={(e) => props.listingFunction(e, item, count)} value={props.userInvoice.expense[count].unitPrice} name="unitPrice"></input>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <input type="text" className="expenseInputBox" id={props.userInvoice.expense[count].id} onChange={(e) => props.listingFunction(e, item, count)} value={props.userInvoice.expense[count].qty} name="qty"></input>
                    </div>
                    <div className="listDiv1" style={{backgroundColor: (count%2===0?"#C0C0C0" : "#DCDCDC")}}>
                        <input type="text" className="expenseInputBox" id={props.userInvoice.expense[count].id} onChange={(e) => props.listingFunction(e, item, count)} value={props.userInvoice.expense[count].total} name="total"></input>
                    </div> 
                </div>
            )}
            <div className="bottomPrintView">
                <div className="listDiv1" id="totalDiv" >
                    <label className="inputLabelInvoice" id="printViewInvoice2"><b>SubTotal:</b> </label>
                    <label className="inputLabelInvoice" id="printViewInvoice22"><b>₹ {props.userInvoice.billAmount}</b> </label>

                    <label className="inputLabelInvoice" id="printViewInvoice3"><b>Tax:</b> </label> 
                    <label className="inputLabelInvoice" id="printViewInvoice33"><b>0%</b> </label> 

                    <label className="inputLabelInvoice" id="printViewInvoice4"><b>Paid: </b> </label> 
                    <label className="inputLabelInvoice" id="printViewInvoice44"><b>₹ {props.userInvoice.paidAmount} </b> </label> 

                    <label className="inputLabelInvoice" id="printViewInvoice5"><b>Pending: </b> </label>
                    <label className="inputLabelInvoice" id="printViewInvoice55"><b>₹ {props.userInvoice.billAmount - props.userInvoice.paidAmount}</b> </label>
                </div>
                <div className="inputBoxOuterView" id="inVoicePrintButton" >
                        <button type= "submit" value="submit" className="button" id="addEditDetail" onClick={(e) => props.printFunction()}>
                            Print Invoice
                        </button>
                </div>
             </div>
            </div>
        </div>
    )
}
export default ViewInvoice;