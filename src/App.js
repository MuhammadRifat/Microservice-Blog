import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import { createContext, useState } from 'react';
import NewPost from './components/Dashboard/NewPost/NewPost';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import BlogDetails from './components/BlogDetails/BlogDetails';

export const userContext = createContext();
export const API_URL = {
  USER: 'http://localhost:3000',
  BLOG: 'http://localhost:3001',
  COMMENT: 'http://localhost:3003',
  LIKE: 'http://localhost:3002',
  FILE: 'http://localhost:3004',
  IMAGE: 'http://localhost:3004/uploads/images/original/',
}

function App() {
  const user = localStorage.getItem('user');

  const [loggedInUser, setLoggedInUser] = useState(user ? JSON.parse(user) : {});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/blog/:id">
            <BlogDetails></BlogDetails>
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
