import React from 'react';
import { Card } from 'semantic-ui-react';
import { checkIfUserExist } from 'utils.js';

class Home extends React.Component {
  handleCardClick = (user) => {
    let { selectedUsers } = this.props;
    if(!checkIfUserExist(selectedUsers, user)) {
      this.props.updateSelectedUsers("insert", user);
    } else {
      this.props.updateSelectedUsers("delete", user);
    }
  };

  handleUserClick = (event, user) => {
    this.props.updateUser(user);
    this.props.changePage("user");
    event.stopPropagation();
  };

  render() {
    const { users, selectedUsers } = this.props;
    return (
      <Card.Group>
        {users.length > 0 && users.map((user) => (
          <Card className="user-cards" key={user.id} color={checkIfUserExist(selectedUsers, user) ? "green" : "red"} onClick={() => this.handleCardClick(user)}>
            <Card.Content>
              <Card.Header onClick={(event) => this.handleUserClick(event, user)}>{user.name}</Card.Header>
              <Card.Meta>{user.email}</Card.Meta>
              <Card.Description>
                <strong>{user.company.name}</strong><br/>
                {user.company.catchPhrase}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  };
}

export default Home;
