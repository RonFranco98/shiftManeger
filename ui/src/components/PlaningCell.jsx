import React , {Component} from "react"
class PlaningCell extends Component {
    state = {
        picked: false,
        pickedUser:""
    }
    render(){
        if(this.state.picked == false){
            return <td>{this.getButtons()}</td>
        }
        let user = this.state.pickedUser
        return <td onClick={() => this.onClick("")} className={this.props.coloringMap[user]}>{user}</td>
    }
    componentWillReceiveProps(newProps){
        if(this.props.restrictions.table == newProps.restrictions.table){return}
        let {restrictions:{table} , day , shift } = newProps
        if(this.props.shiftToSend[day][shift]){
            this.setState({picked:true , pickedUser:this.props.shiftToSend[day][shift]})
            return
        }
        this.setState({picked:table?.[day]?.[shift] ? true : false , pickedUser : table?.[day]?.[shift]})
    }
    getButtons(){
        let {restrictions , userList , day, shift} = this.props
        let buttons = []
        userList.forEach(user => {
            if(restrictions.recurringRestrictions?.[user]?.[day]?.includes(shift) || restrictions.restrictions?.[user]?.[day]?.includes(shift)){
                buttons.push(<button className="btn btn-danger" onClick={() => {this.onClick(user)}}>{user}</button>)
            }else{
                buttons.push(<button className="btn btn-success" onClick={() => {this.onClick(user)}}>{user}</button>)
            }
        })
        return buttons
    }
    onClick = (user) => {
        let {day , shift} = this.props
        this.props.retriveUserPick(user , day , shift)
        this.setState({picked:!this.state.picked , pickedUser:user})
    }
}

export default PlaningCell