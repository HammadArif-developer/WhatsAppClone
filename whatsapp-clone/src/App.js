import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import chatScreen from './Screens/ChatScreen/Chatscreen';
// import Sidebar from './Components/Sidebar/Sidebar';
// import Chat from './Components/Chat/Chat';
function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={chatScreen}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
