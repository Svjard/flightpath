import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

class App extends React.Component {
  render () {
    const {dispatch} = this.props;

    return (
      <div id="page-container" className="page-container page-header-fixed page-sidebar-fixed page-with-two-sidebar page-with-footer page-without-sidebar">
        {this.props.isAuthenticated ?
          <Navbar/> : null
        }
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(App);
