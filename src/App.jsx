import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const App = ({ title }) => <h1>{title}</h1>;
console.info('test');
App.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;
