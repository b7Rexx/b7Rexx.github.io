import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.css';
import './styles/reset.css';
// import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.css';
import './styles/media.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import list from './api/list';

ReactDOM.render(<App list={list}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
