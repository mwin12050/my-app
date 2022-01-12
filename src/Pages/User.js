import React from 'react';
import { Card, Tab } from 'semantic-ui-react';
import { formatAddress } from 'utils.js';
import Posts from 'Pages/Posts';
import Albums from 'Pages/Albums';

class User extends React.Component {
  render() {
    const { user, posts, albums } = this.props;
    const panes = [
      { menuItem: 'Posts', render: () => <Tab.Pane><Posts posts={posts} selectedUsers={[user]}/></Tab.Pane> },
      { menuItem: 'Albums', render: () => <Tab.Pane><Albums albums={albums} selectedUsers={[user]}/></Tab.Pane> }
    ]
    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Card.Description>
              <strong>Email: </strong>{user.email}<br/>
              <strong>Phone: </strong>{user.phone}<br/>
              <strong>Address: </strong>{formatAddress(user.address)}<br/>
              <strong>Company: </strong>{user.company.name}<br/>
            </Card.Description>
          </Card.Content>
        </Card>
        <Tab panes={panes}></Tab>
      </>
    );
  };
}

export default User;
