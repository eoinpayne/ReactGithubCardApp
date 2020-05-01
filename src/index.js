import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';






class Card extends React.Component {
  render(){
    return (
      <div className = "github-profile">
        <img src="https://placehold.it/75" />
        <div className = "info">
          <div className = "name">{this.props.name}</div>
          <div className = "company">Company Name here..</div>
        </div>
      </div>
    )
  }
}


class GitApp extends React.Component {
  render(){
    return (
      <div>
        <div className = "header">{this.props.title}</div> 
        <Card name = "eoin"/>
    </div>
    )
  }
}


ReactDOM.render(
    <GitApp title = "GitHub card App"/>,
  document.getElementById('root')
);






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
