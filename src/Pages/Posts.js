import React from 'react';
import { Input, Menu, Table } from 'semantic-ui-react';
import { filterArrayByUsers, filterArrayByTitle, filterArrayByPage, getTotalPages } from 'utils.js';

class Posts extends React.Component {
  state = {
    page: 1,
    title: ""
  };

  componentDidUpdate() {
    const { selectedUsers, posts } = this.props;
    const { page, title } = this.state;
    const filteredPosts = filterArrayByTitle(filterArrayByUsers(posts, selectedUsers), title);
    const totalPages = getTotalPages(filteredPosts);
    if (page > totalPages) {
      this.setState({
        page: 1,
      });
    }
  };

  handleIconChange= (event, {value}) => {
    this.setState({
      title: value
    });
  };

  handleItemClick = (event, {name}) => {
    this.setState({
      page: name
    });
  };

  renderPages(totalPages) {
    let content = [];
    const { page } = this.state;
    for (var i = 1; i <= totalPages; i++) {
      content.push(
        <Menu.Item as='a' name={String(i)} active={page === i} key={i} onClick={this.handleItemClick}>
          {i}
        </Menu.Item>
      );
    }
    return content;
  };

  render() {
    const { selectedUsers, posts } = this.props;
    const { page, title } = this.state;
    const filteredPosts = filterArrayByTitle(filterArrayByUsers(posts, selectedUsers), title);
    const paginatedPosts = filterArrayByPage(filteredPosts, page);
    const totalPages = getTotalPages(filteredPosts);
    return (
      <>
        <Input
          placeholder='Title...'
          onChange={this.handleIconChange}
        />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Body</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedPosts.length > 0 && paginatedPosts.map((post) => (
              <Table.Row key={post.id}>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.body}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                  {this.renderPages(totalPages)}
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </>
    );
  };
}

export default Posts;
