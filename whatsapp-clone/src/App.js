import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import chatScreen from './Screens/ChatScreen/Chatscreen';
import Login from './Screens/Login/login';
// import Sidebar from './Components/Sidebar/Sidebar';
import Popup from './Components/Popup/popup';
function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/chat" component={chatScreen}/>
            <Route exact path="/popupcheck" component={Popup}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
