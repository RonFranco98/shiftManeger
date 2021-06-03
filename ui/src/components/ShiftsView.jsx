import React , {Component} from "react"
import PlaningCell from "./PlaningCell"
import CommitShift from "./CommitShift"
class PlaningTable extends Component {
    state = {

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
                            let user = this.props.shift?.table?.[day]?.[shift]
                            return <td className={this.props.coloringMap[user]}>{user}</td>
                        })}
                    </tr>
                )
            })}
        </table>
        </React.Fragment>
        )
    }
    async componentWillReceiveProps(newProps){
        this.props.getShift(newProps.week)
    }
}

export default PlaningTable