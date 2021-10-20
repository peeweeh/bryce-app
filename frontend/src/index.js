import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Blank from './Blank';
import Create from './Create';
import FileUpload from './FileUpload';
import Edit from './Edit';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
  
    <Router>
          <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/blank" component={Blank} />
                <Route exact path="/create" component={Create} />
                <Route exact path="/fileupload" component={FileUpload} />
                <Route exact path="/edit/:id" render={ ({match}) => <Edit id={match.params.id}/>}/>
          </Switch>
        </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
