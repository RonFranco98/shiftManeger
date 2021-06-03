import React , {Component} from "react"
class Nav extends Component {
    state = {

    }
    render() {
        let elements = [<div className="col text-center menuTab" onClick={() => this.props.retriveCurrentTab("shifts")}><h2>Shifts</h2></div>]
        if(this.props.usertype === "employ"){
            elements.push(<div className="col text-center menuTab" onClick={() => this.props.retriveCurrentTab("Restrictions")}><h2>Restrictions</h2></div>)
        }
        else if((this.props.usertype === "boss")){
            elements.push(<div className="col text-center menuTab" onClick={() => this.props.retriveCurrentTab("ShiftPlaning")}><h2>Shift Planing</h2></div>)
        }
        return (
            <div className="row">
                {elements}
            </div>
        )
    }
}

export default Nav