import React from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';
import {fetchProtectedData} from '../actions/protected-data';
import FormFavorites from './form-favorites';

class Favorites extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    render() {   
        return (
            <div className="favorites">
                <h4>You have reached the PROTECTED ZONE</h4>
                {/* <FormFavorites />    */}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    };
};

export default reduxForm(connect(mapStateToProps)(Favorites));