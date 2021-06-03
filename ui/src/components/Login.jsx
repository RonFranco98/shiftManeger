import React , {Component} from "react"
import logo from "./logo.png"

class Login extends Component {
    state = {
        username:"",
        password:""
    }
    render() {
        return (
            <center>
            <img src={logo} />
            <h2>
                Login
            </h2>
            <div className="container shadow p-3 mb-5 bg-white rounded m-5">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter username" id="username" onChange={(e) => this.setState({username:e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password" id="pwd" onChange={(e) => this.setState({password:e.target.value})} />
                </div>
                <div className="form-group">
                    <input class="btn btn-primary" type="submit" value="login" onClick={() => this.checkUser()}/>
                </div>
            </div>
            </center>
        );
    }
    async checkUser(){
        let {username , password} = this.state;
        let raw = await fetch(`http://localhost:8000/authenticate?password=${password}&username=${username}`)
        let res = await raw.json();
        this.props.checkLogin(res , username)
    }
}

export default Login