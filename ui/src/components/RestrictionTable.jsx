import React , {Component} from "react"
import TaggableCell from "./TaggableCell";
import CommitRestrictions from "./CommitRestrictions";
class RestrictionTable extends Component {
    render(){
        return this.generateTable()
    }
    generateTable(){
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        let shifts = ["morning" , "evning" , "night"]
        let table =(
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
                            return <TaggableCell shift={shift} day={day} updateRestrictionBag={this.props.updateRestrictionBag} restrictionState={this.props.restrictionBag[day]?.includes(shift)} recurringRestrictionsState={this.props.recurringRestrictions[day]?.includes(shift)}/>
                        })}
                    </tr>
                )
            })}
            
        </table>
        <CommitRestrictions commitRistrictionChanges={this.props.commitRistrictionChanges} />
        </React.Fragment>
        );
        return table
    }

}

export default RestrictionTable