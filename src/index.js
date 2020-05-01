import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



	const testData = [
			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
      {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
	];


const CardList = (props) => (
  <div>
    {testData.map(profile => <Card {...profile}/>)}
    {/* <Card {...testData[0]}/>
    <Card {...testData[1]}/> */}
  </div>
)

class Card extends React.Component {
  render(){
    // const profile = this.props;
    return (
      <div className = "github-profile">
        <img src={this.props.avatar_url} />
        <div className = "info">
          <div className = "name">{this.props.name}</div>
          <div className = "company">{this.props.company}</div>
          <div className = "company">test</div>
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
        <CardList/>
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
