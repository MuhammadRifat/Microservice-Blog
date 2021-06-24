import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Dropdown from './components/Header/Dropdown/Dropdown';
import { createContext, useState } from 'react';
import NewPost from './components/Dashboard/NewPost/NewPost';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({});

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header toggle={toggle} isVisible={isVisible} setIsVisible={setIsVisible}></Header>
        <Dropdown isOpen={isOpen} toggle={toggle} setIsVisible={setIsVisible}></Dropdown>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute path="/new-post">
            <NewPost></NewPost>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
