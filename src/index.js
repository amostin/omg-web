import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/js/bootstrap.bundle.min';

//SBAdmin2 Style
import './styles/scss/sb-admin-2.scss';

//Redux
import { Provider } from 'react-redux';
import Store from './redux/store';

ReactDOM.render(
<Provider store={Store}>
    <App />
</Provider> , document.getElementById('root'));
