import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import routes from './routes';
import { Router, browserHistory } from 'react-router';  
//import browserHistory from 'react-router/lib/browserHistory';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';  
import { Provider } from 'react-redux';  

import './index.css';
import './bulma.css';

const store = configureStore();
store.subscribe(() => {
  console.log('store get state', store.getState())
  localStorage.setItem('robotAppState2', JSON.stringify(store.getState()) );
})

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
