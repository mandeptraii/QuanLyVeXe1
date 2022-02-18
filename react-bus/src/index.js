// ReactDOM.render( <App />,document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppFinal from './components/AppFinal'
import { reducer } from './components/UserReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import User from './User';

const store = createStore(reducer)

const render = () => ReactDOM.render(
  <Provider store={store}>
    <AppFinal/>
  </Provider>,
  document.getElementById('root')
);

render()
store.subscribe(render)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


