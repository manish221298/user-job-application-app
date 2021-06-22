import React, { Component } from 'react';


class UserDetails extends Component {
    state = {
        showUserDetails : false,
    }

    render() {
        return (<div>
            <button onClick={() => {this.setState({showUserDetails: true})}} >Details</button>
            {this.state.showUserDetails &&  <div className="UserDetails">
                {this.props.user.name}
                <br/>
                <button onClick={() => {this.setState({showUserDetails: false})}} >Close</button>
            </div>}
        </div>);
    }
}

export default UserDetails;