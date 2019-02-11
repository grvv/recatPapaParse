import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// My Code
// import { MoviesTable } from "./components/MoviesTable";

/**
 * Webpack Issue with newly created react app
 * https://github.com/webpack/webpack/issues/8768
 * https://stackoverflow.com/questions/54612657/why-does-npm-start-give-error-in-node-js
 */



import { PapaParse } from "./components/PapaParse";

import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<PapaParse />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
