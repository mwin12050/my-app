import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class Header extends Component {
  handleItemClick = (e, { name }) => {
    this.props.changePage(name);
  };

  render() {
    const { page } = this.props;

    return (
      <Menu className="header">
        <Menu.Item
          name="home"
          active={page === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="posts"
          active={page === "posts"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="albums"
          active={page === "albums"}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  };
}

export default Header;