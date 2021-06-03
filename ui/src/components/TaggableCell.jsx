import React , {Component} from "react"
import RestrictionTable from "./RestrictionTable"
class TaggableCell extends Component {
    state = {
        status:0,
        text:"",
        colorClass:""
    }
    render(){
        return <td className={this.state.colorClass} onClick={() => this.setState(this.onChange)}>{this.state.text}</td>
    }
    componentWillReceiveProps(newProps){
        let status = 0
        let {restrictionState ,recurringRestrictionsState} = newProps
        if(restrictionState){
            status = 1
        }
        if(recurringRestrictionsState){
            status = 2
        }
        this.setState({status:status} , () => {this.pickColor(status)})
    }
    pickColor = (status) => {
        if(status == 0){
            this.setState({text:"available" , colorClass:""})
        }
        if(status == 1){
            this.setState({text:"looked" , colorClass:"table-danger"})
        }
        if(status == 2){
            this.setState({text:"loop look" , colorClass:"table-warning"})
        }
    }
    onChange = () =>{
        let {updateRestrictionBag , day , shift} = this.props
        let newStatus = this.state.status + 1
        if(newStatus > 2){newStatus = 0}
        if(newStatus == 0){
            updateRestrictionBag(day,shift , true)
        }
        if(newStatus == 1){
            updateRestrictionBag(day,shift , false)
        }
        if(newStatus == 2){
            updateRestrictionBag(day,shift , false)
            updateRestrictionBag(day,shift , true)
        }
        this.setState({status:newStatus})
        this.pickColor(newStatus)
    } 
}

export default TaggableCell