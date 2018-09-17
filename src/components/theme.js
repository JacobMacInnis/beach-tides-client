import React from 'react';
import './theme.css';
import {connect} from 'react-redux';
import { changeTheme } from './../actions/favorite';

class Theme extends React.Component {
  handleThemeToggle = () => {
    this.props.dispatch(changeTheme());
  }
  render() {
      let theme = this.props.theme;
      return ( 
        <div className="onoffswitch">
          <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" 
          onChange={() => this.handleThemeToggle()}
          checked={theme === 'day'} />
          <label className="onoffswitch-label" htmlFor="myonoffswitch">
            <span className="onoffswitch-inner"></span>
            <span className="onoffswitch-switch"></span>
          </label>
        </div>
      );
  }
}
const mapStateToProps = state => {
  return { 
    theme: state.favorite.theme
  }
}

export default connect(mapStateToProps)(Theme);