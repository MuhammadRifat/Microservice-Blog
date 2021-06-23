import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Header from './components/Header/Header';
import Dropdown from './components/Header/Dropdown/Dropdown';
import { useState } from 'react';
import NewPost from './components/Admin/NewPost/NewPost';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <Router>
        <Header toggle={toggle}></Header>
        <Dropdown isOpen={isOpen} toggle={toggle}></Dropdown>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/new-post">
            <NewPost></NewPost>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
