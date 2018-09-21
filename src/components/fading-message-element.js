import React from 'react';
import './fading-message-element.css';
import { connect } from 'react-redux';

class FadingMessageElement extends React.Component {
  render() {
    // let searchError;
      if (this.props.searchError) {
        return (<section className='fading-message-section'><h2 className='fading-message-search-error'>{this.props.searchError.message}</h2></section>);
      }
    return (
        <section className='fading-message-section'>
          <h2 className='fading-message' >LOCATIONS MUST BE IN A U.S. COASTAL STATE</h2>
        </section>
    )
  }
}

const mapStateToProps = state => {
  return { 
    searchError: state.search.error,
    theme: state.theme.theme
  }
}

export default connect(mapStateToProps)(FadingMessageElement);