import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// import i18n (needs to be bundled ;)) 
import './i18n';
import { user_set_locale, user_set_user } from './slices/user-slice';

// NOTA: ESTO TIENE QUE CAMBIAR DEPENDIENDO DEL LOGIN
store.dispatch(user_set_user(1))
store.dispatch(user_set_locale())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
     <App />
   </Provider>
 </React.StrictMode>
);

