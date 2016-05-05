import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Navbar from './Navbar';

const App = (props) => {
  return (
    <div id="page-container" className="page-container page-header-fixed page-sidebar-fixed page-with-two-sidebar page-with-footer page-without-sidebar">
      <Navbar/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
