import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';



	const testData = [
			// {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
      // {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
	];


const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id}{...profile}/>)} 
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

class Form extends React.Component{
  state = {userName : ""};
  handleSubmit = async (event) => { // event object just a wrapper around native even object, all native methods available
    event.preventDefault(); //stop default submit behaviour refreshing the page upon submit.
    //TODO: validate no response
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`); //template string ``
    // console.log(resp.data);
    this.props.onSubmit(resp.data)
    this.setState({userName: ""})
    };
    handleNameChange = (event) => {
      this.setState({userName: event.target.value})
    }
  render(){
    return(
      //TODO: validate input
        //>1 char < 100
        //no special characters (might not be valid for github itself)
      <form onSubmit = {this.handleSubmit}>
        <input 
          type = "text" 
          placeholder = "Github username" 
          required
          value = {this.state.userName}
          onChange = {this.handleNameChange}  //onchange being called with every letter change
        />
        <button>Add Card</button>
        {/* <button onClick = {this.props.onClick_searchAndUpdate("eoin.payne")}>Add Card</button> */}
      </form>

    )
  }
}


class GitApp extends React.Component {

  state = {
    profiles : testData
  }
  searchAndUpdateProfile = (foundProfile) => {
    this.setState(prevState => ({
    profiles: [...prevState.profiles, foundProfile]
    }))
  }
  
  render(){
    // const [profiles,updateProfiles] = useState(testData); //state is here as it'll be accessable to children (ie form and cardlist)


    return (
      <div>
        <div className = "header">{this.props.title}</div>
        {/* <Form/>  */}
        <Form onSubmit = {this.searchAndUpdateProfile}/> 
        <CardList profiles = {this.state.profiles} />
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
