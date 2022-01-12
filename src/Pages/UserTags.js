import React from 'react';
import { Dropdown, Icon, Label } from 'semantic-ui-react';
import { checkIfUserExist } from 'utils.js';

class UserTags extends React.Component {
  handleIconClick = (event, user) => {
    this.props.updateSelectedUsers("delete", user);
    event.stopPropagation();
  };

  handleUserClick = (user) => {
    this.props.updateUser(user);
    this.props.changePage("user");
  };

  handleDropdownChange = (event, data) => {
    const { users } = this.props;
    if (data.value === "") {
      return;
    }
    let user = users.find((user) => {
      return user.id === data.value
    });
    this.props.updateSelectedUsers("insert", user);
  };

  formatUserOptions = () => {
    const { users, selectedUsers } = this.props;
    let options = [];
    users.forEach((user) => {
      if(!checkIfUserExist(selectedUsers, user)) {
        options.push({
          key: user.id,
          text: user.name,
          value: user.id,
        });
      }
    });
    return options;
  };

  render() {
    const { selectedUsers } = this.props;
    return (
      <div className="user-tags">
        <Dropdown
          placeholder='Select User'
          selection
          clearable
          options={this.formatUserOptions()}
          onChange={this.handleDropdownChange}
        />
        {selectedUsers.length > 0 && selectedUsers.map((user) => (
          <Label as="a" color="green" key={user.id} onClick={() => this.handleUserClick(user)}>
            {user.name}
            <Icon name="delete" onClick={(event) => this.handleIconClick(event, user)}/>
          </Label>
        ))}
      </div>
    );
  };
}

export default UserTags;
