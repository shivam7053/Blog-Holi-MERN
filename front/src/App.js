import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import CreateBlog from "./components/CreateBlog";
import CommentList from "./components/CommentList";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={BlogList} />
          <Route path="/blogs/:id" component={BlogDetail} />
          <Route path="/create-blog" component={CreateBlog} />
          <Route path="/comments/:id" component={CommentList} />
          <Route path="/profile" component={UserProfile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
