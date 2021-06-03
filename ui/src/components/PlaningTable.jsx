import React , {Component} from "react"
import PlaningCell from "./PlaningCell"
import CommitShift from "./CommitShift"
class PlaningTable extends Component {
    state = {
        restrictions:{},
        userList:[]
    }
    render() {
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        let shifts = ["morning" , "evning" , "night"]
        return(
            <React.Fragment>
            <table class="table table-bordered" >
            <tr>
                <th>shifts</th>
                {days.map(item => {
                    return <th>{item}</th>
                })}
            </tr>
            {shifts.map(shift => {
                return(
                    <tr>
                        <td>{shift}</td>
                        {days.map(day => {
                            return <PlaningCell retriveUserPick={this.props.retriveUserPick} day={day} shift={shift} restrictions={this.state.restrictions} userList={this.state.userList} shiftToSend={this.props.shiftToSend} coloringMap={this.props.coloringMap}/>
                        })}
                    </tr>
                )
            })}
        </table>
        <CommitShift commitShiftTable={this.props.commitShiftTable}/>
        </React.Fragment>
        )
    }
    async componentWillReceiveProps(newProps){
        let week = newProps.week
        if(this.props.week === week){return}
        let raw = await fetch(`http://localhost:8000/getAllRestrictions?week=${week}`)
        let res = await raw.json()
        let raw2 = await fetch(`http://localhost:8000/getShift?week=${week}`)
        let preShift = await raw2.json()
        let userList = Object.keys(res.recurringRestrictions)
        res.table = preShift.table
        this.props.mutateShiftToSend(preShift.table)
        this.setState({restrictions:res , userList: userList})
    }
}

export default PlaningTable