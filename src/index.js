import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// import i18n (needs to be bundled ;)) 
import './i18n';
import i18next from 'i18next';

const root = ReactDOM.createRoot(document.getElementById('root'));

var lang = Navigator.language;
if (store.getState().user.id!==""){
  lang = store.getState().user.locale
}

if(!i18next.isInitialized){
  i18next.init({
      lng:lang,
      fallbackLng: 'es-ES',
      debug: false,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      }
    }).then(()=>{
      console.log("DESPUÉS DE i18next.init, HEMOS QUIDADO REACT.STRICTMODE para que funcione el editor de Blueprints")
      
      root.render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    }).catch((error)=>{
      root.render(
        <React.StrictMode>
        <Provider store={store}>
          <p>ERROR DE LENGUAJE</p>
        </Provider>
      </React.StrictMode>
      )
    })
  }else{
      if (i18next.language!==lang){
        i18next.changeLanguage(lang);
      }
  }


/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
     <App />
   </Provider>
 </React.StrictMode>
);  */

