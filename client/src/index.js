// Packages Imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Component Imports
import App from './App';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
