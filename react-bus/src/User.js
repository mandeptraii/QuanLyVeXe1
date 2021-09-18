import React from "react";
import UserInfo from "./UserInfo";


class User extends React.Component{
    constructor(props){
        super(props)

        this.users = [{
            "id": 1,
            "name": "NGUYEN VAN A"
        },{
            "id": 2,
            "name": "Tran Thi B"
        },{
            "id": 1,
            "name": "NGUYEN VAN C"
        }]

        this.state = {
            'name': ""
        }
    }

    change = (event) => {
        this.setState({
            "name": event.target.value
        })
    }

    render(){
        return (
            <>
                <h1>Welcome to our website</h1>
                <h2>TEST</h2>
                <h3>Welcome {this.props.firstName} {this.props.lastName}</h3>
                <ul>
                    {this.users.map(u => <UserInfo user={u}/>)}
                </ul>
                <div>
                    <input type="text" value={this.state.name} onChange={this.change} />
                    <h1>Welcome {this.state.name}</h1>
                </div>
            </>
        )
    }
}

export default User