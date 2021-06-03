import React , {Component} from "react"
class CommitShift extends Component {
    state = {
        
    }
    render() {
        return <button type="button" class="btn btn-success btn-lg btn-block" onClick={this.props.commitRistrictionChanges}>Commit</button>
    }
}

export default CommitShift