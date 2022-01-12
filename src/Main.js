import React, { Component } from 'react'
import Home from 'Pages/Home';
import Posts from 'Pages/Posts';
import Albums from 'Pages/Albums';
import User from 'Pages/User';
import UserTags from 'Pages/UserTags';
import { removeUser } from 'utils.js'

class Main extends Component {
  state = {
    user: null,
    users: [],
    selectedUsers: [],
    posts: [],
    albums: []
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result
          });
        }
      );
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            posts: result
          });
        }
      );
      fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            albums: result
          });
        }
      );
  };

  updateSelectedUsers = (mode, user) => {
    let { selectedUsers } = this.state;
    if(mode === 'insert') {
      selectedUsers.push(user);
    } else if (mode === 'delete') {
      selectedUsers = removeUser(selectedUsers, user);
    }
    this.setState({
      selectedUsers
    });
  }

  updateUser = (user) => {
    this.setState({
      user
    });
  }

  render() {
    const { page, changePage } = this.props;
    const { user, users, selectedUsers, posts, albums } = this.state;
    let currentPage = <Home users={users} selectedUsers={selectedUsers} updateSelectedUsers={this.updateSelectedUsers} changePage={changePage} updateUser={this.updateUser}/>;
    if (page === "posts") {
      currentPage = <Posts posts={posts} selectedUsers={selectedUsers}/>
    }
    if (page === "albums") {
      currentPage = <Albums albums={albums} selectedUsers={selectedUsers}/>
    }
    if (page === "user") {
      return (
        <div className="main">
          <User user={user} posts={posts} albums={albums}/>
        </div>
      );
    }
    return (
      <div className="main">
        <UserTags users={users} selectedUsers={selectedUsers} updateSelectedUsers={this.updateSelectedUsers} changePage={changePage} updateUser={this.updateUser}/>
        {currentPage}
      </div>
    );
  };
}

export default Main;