import React from 'react';
import { Input, Menu, Table } from 'semantic-ui-react';
import { filterArrayByUsers, filterArrayByTitle, filterArrayByPage, getTotalPages } from 'utils.js';

class Albums extends React.Component {
  state = {
    page: 1,
    title: ""
  };

  componentDidUpdate() {
    const { selectedUsers, albums } = this.props;
    const { page, title } = this.state;
    const filteredAlbums = filterArrayByTitle(filterArrayByUsers(albums, selectedUsers), title);
    const totalPages = getTotalPages(filteredAlbums);
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
    const { selectedUsers, albums } = this.props;
    const { page, title } = this.state;
    const filteredAlbums = filterArrayByTitle(filterArrayByUsers(albums, selectedUsers), title);
    const paginatedAlbums = filterArrayByPage(filteredAlbums, page);
    const totalPages = getTotalPages(filteredAlbums);
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedAlbums.length > 0 && paginatedAlbums.map((album) => (
              <Table.Row key={album.id}>
                <Table.Cell>{album.title}</Table.Cell>
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

export default Albums;
