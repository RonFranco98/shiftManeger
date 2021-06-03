import React , {Component} from "react"
class Nav extends Component {
    state = {
        username:"",
        password:"",
        userType:"employ"
    }
    render() {
        return (
            <div className="container">
                <div className="form-group">
                    <label>username:</label>
                    <input type="text" className="form-control" placeholder="Enter username" id="username" onChange={(e) => this.setState({username:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" className="form-control" placeholder="Enter password" id="pwd" onChange={(e) => this.setState({password:e.target.value})} />
                </div>
                <div className="form-group">
                    <select>
                        <option onclick={() => {this.setState({userType:"employ"})}}>Employ</option>
                        <option onclick={() => {this.setState({userType:"boss"})}}>Boss</option>
                    </select>
                </div>
                <div className="form-group">
                    <input class="btn btn-primary" type="submit" value="Submit" onClick={() => this.addUser()}/>
                </div>
            </div>
        )
    }
    addUser = () => {
        
    }
}

export default Nav