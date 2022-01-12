import React from 'react';
import Header from 'Header';
import Main from 'Main';

class App extends React.Component {
  state = {
    page: "home"
  };

  changePage = (page) => {
    this.setState({ page: page });
  }

  render() {
    const { page } = this.state;
    return (
      <div className="app">
        <Header
          page={page}
          changePage={this.changePage}
        />
        <Main page={page} changePage={this.changePage}/>
      </div>
    );
  };
}

export default App;
