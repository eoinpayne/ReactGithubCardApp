import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';



const testData = [
  { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];


const CardList = (props) => {
  return (
    <div>
      <p>    {console.log("props fro map", props.profiles)}</p>
      {props.profiles.map(profile => <Card key={profile.id}{...profile} />)}
    </div>
  )
}

const Card = (props) => {
  return (
    <div className="github-profile">
      <img src={props.avatar_url} />
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="company">{props.company}</div>
      </div>
    </div>
  )
}

function Form(props) {
  const [userName, updateUserName] = useState("");

  const getUserProfile = (userNameInput) => props.gitHubUserNameCardAPI(`https://api.github.com/users/${userNameInput}`);

  const handleSubmit = async (event) => { // event object just a wrapper around native even object, all native methods available
    event.preventDefault();
    //TODO: validate no response
    const resp = await getUserProfile(userName);
    props.onSubmit(resp.data);
    updateUserName("");
  };

  const handleNameChange = (event) => {
    updateUserName(event.target.value)

  }
  const userNameInValidLength = userName.length < 2 || userName.length > 30;
  const userNameInvalidChar = userName.includes("{") || userName.includes("}");
  const isInvalidUsername = userNameInValidLength || userNameInvalidChar;
  return (
    <form onSubmit={handleSubmit}>
      <input
        style={userNameInvalidChar ? { border: '2px solid red' } : {}}
        type="text"
        placeholder="Github username"
        required
        value={userName}
        onChange={handleNameChange}
      />
      <button disabled={isInvalidUsername} >Add Card</button>
    </form>
  )
}


function GitApp(props) {
  const [profiles, updateProfiles] = useState(testData);
  const callAPI = async (address) => await axios.get(`${address}`);
  const searchAndUpdateProfile = (foundProfile) => {
    updateProfiles(profiles.concat(foundProfile));
  }

  return (
    <div>
      <div className="header">{props.title}</div>
      <Form
        onSubmit={searchAndUpdateProfile}
        // gitHubUserNameCardAPI = {this.callAPI(`https://api.github.com/users/${userName}`)}/> 
        gitHubUserNameCardAPI={callAPI} />
      <CardList profiles={profiles} />
    </div>
  )

}


ReactDOM.render(
  <GitApp title="GitHub card App" />,
  document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
