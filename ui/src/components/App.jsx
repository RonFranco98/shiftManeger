import React , {Component} from "react"
import Login from "./Login";
import Nav from "./Nav"
import MyCalendar from "./MyCalendar";
import RestrictionTable from "./RestrictionTable";
import ShiftsView from "./ShiftsView"
import PlaningTable from "./PlaningTable";
class App extends Component {
    state = {
        "isLogedin":false,
        "usertype":undefined,
        "username":undefined,
        "currTab":"",
        "restrictionBag":{},
        "recurringRestrictions":{},
        "selectedDate":undefined,
        "wasSomethingUpdated":false,
        "shiftToSend":this.initShiftToBeSent(),
        "shiftToShow":undefined,
        "coloringMap":{}
    }
    constructor(props){
        super(props)
        let payload = {}
        let colors = ["orange" , "blue" , "green" , "red" , "gray" , "pink"]
        fetch("http://localhost:8000/getAllEmploysNames")
        .then(response => response.json())
        .then(userList => {
            for(let i = 0; i < userList.length; i++){
                let user = userList[i]
                payload[user] = colors[i]
            }
            this.setState({coloringMap: payload})
        });
    }
    render() {
        let {retriveCurrentTab , retriveDate ,retriveRestrictions ,commitRistrictionChanges, commitShiftTable ,updateRestrictionBag ,checkLogin , retriveUserPick , mutateShiftToSend , getShift } = this
        let {username ,restrictionBag,recurringRestrictions ,currTab , usertype , selectedDate , shiftToSend , shiftToShow ,coloringMap} = this.state
        if(this.state.isLogedin){
            let elementToShow;
            if(currTab === "shifts"){
                elementToShow = <ShiftsView week={selectedDate} getShift={getShift} shift={shiftToShow} coloringMap={coloringMap}/>
            }
            else if(currTab === "Restrictions"){
                elementToShow = <RestrictionTable updateRestrictionBag={updateRestrictionBag} restrictionBag={restrictionBag} recurringRestrictions={recurringRestrictions} week={selectedDate} commitRistrictionChanges={commitRistrictionChanges}/>
            }
            else if(currTab === "ShiftPlaning"){
                elementToShow = <PlaningTable week={selectedDate} shiftToSend={shiftToSend} retriveUserPick={retriveUserPick} commitShiftTable={commitShiftTable} mutateShiftToSend={mutateShiftToSend} coloringMap={coloringMap}/>
            }
            return (
                <React.Fragment>
                <Nav retriveCurrentTab={retriveCurrentTab} usertype={usertype}/>
                <div class="shadow p-3 mb-5 bg-white rounded m-5">
                {elementToShow}
                <MyCalendar retriveDate={retriveDate} userName={username} retriveRestrictions={retriveRestrictions} commitRistrictionChanges={commitRistrictionChanges}/>
                </div>
                </React.Fragment>
            )
        }
        else{
            return <Login checkLogin={checkLogin}/>;
        }
    }
    checkLogin = (res , username) => {
        let {auth , userType , recurringRestrictions} = res
        this.setState({"isLogedin":auth, "usertype":userType ,"username":username ,"recurringRestrictions":recurringRestrictions})
    }
    retriveCurrentTab = (tab) => {
        this.setState({currTab:tab})
    }
    retriveDate = (date) => {
        this.setState({selectedDate:date})
    }
    retriveRestrictions = (restrictions) => {
        this.setState({restrictionBag:restrictions})
    }
    retriveUserPick = (user , day , shift) => {
        let dummy = {...this.state.shiftToSend}
        dummy[day][shift] = user
        this.setState({shiftToSend:dummy})
    }
    updateRestrictionBag = (day , shift , recurring) => {
        let newBag = (recurring) ? {...this.state.recurringRestrictions} : {...this.state.restrictionBag}

        if(!newBag[day]){
            newBag[day] = []
        }
        if(!newBag[day].includes(shift)){
            newBag[day].push(shift)
        }else{
            newBag[day].splice(newBag[day].indexOf(shift) , 1)
            if(newBag[day].length === 0){ 
                delete newBag[day]
            }
        }
        this.setState({[recurring ? "recurringRestrictions" : "restrictionBag"]: newBag ,wasSomethingUpdated:true})
        
    }
    commitRistrictionChanges = async () => {
        console.log("ron")
        if(!this.state.wasSomethingUpdated){
            return
        }
        let {selectedDate , username , restrictionBag , recurringRestrictions} = this.state
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ week:selectedDate , user:username ,restrictions:restrictionBag})
        };
        await fetch('http://localhost:8000/updateRestrictions', requestOptions)
        const secendRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user:username ,restrictions:recurringRestrictions})
        };
        await fetch('http://localhost:8000/updateRecurringRestrictions', secendRequestOptions)
        this.setState({wasSomethingUpdated:false})
    }
    commitShiftTable = async () => {
        let {selectedDate , username , shiftToSend} = this.state
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ week:selectedDate , user:username ,shiftTable:shiftToSend})
        };
        await fetch('http://localhost:8000/updateShiftTable', requestOptions)
    }
    getShift = async (week) => {
        let raw = await fetch(`http://localhost:8000/getShift?week=${week}`)
        let shift = await raw.json()
        this.setState({shiftToShow:shift})
    }
    getRestrictions = async () =>{
        let {selectedDate , username} = this.state
        let raw = await fetch( `http://localhost:8000/getRestrictions/?user=${username}&week=${selectedDate}`,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        let restrictions = await raw.json()
        this.setState({restrictionBag:restrictions})
    }
    mutateShiftToSend = (preShift) => {
        if(preShift){
            this.setState({shiftToSend:preShift})
            return
        }
        this.setState({shiftToSend:this.initShiftToBeSent()})
    }
    initShiftToBeSent(){
        let returnObj = {};
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        let shifts = ["morning" , "evning" , "night"]
        days.forEach(day => {
            returnObj[day] = {}
            shifts.forEach((shift) => {
                returnObj[day][shift] = ""
            })
        })
        return returnObj
    }
}

export default App