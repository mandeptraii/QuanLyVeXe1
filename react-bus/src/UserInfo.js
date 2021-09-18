import React from "react"

class UserInfo extends React.Component{
    render(){
        const s = {
            backgroundColor: 'blue',
            color: 'white'
        }
        return (
            <li style={s}>
                {this.props.user.id} - {this.props.user.name}
            </li>
        )
    }
}

export default UserInfo