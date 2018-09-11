import React from 'react';
import {connect} from 'react-redux';
// import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';

export class Favorites extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(fetchProtectedData());
    // }

    render() {
        console.log(this)
        return (
            <div className="dashboard">
                {/* <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        // username: state.auth.currentUser.username,
        // : `${} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

// export default requiresLogin()(connect(mapStateToProps)(Favorites));
export default connect(mapStateToProps)(Favorites);