import React, { Component } from 'react';
import { Route } from 'react-router'
import AppBar from 'material-ui/AppBar';

import TransactionPage from './TransactionPage/TransactionPage'
import LoginForm from './LoginForm/LoginForm'

class App extends Component {

  render() {
    return (
      <div align="center">
        <AppBar title="Multicoin App" showMenuIconButton={false} style={{marginBottom: '1vw'}}/>

        <Route exact path="/" render={() => (
          <LoginForm />
        )}/>

        <Route exact path="/transaction" component={TransactionPage}/>
      </div>
    )
  }
}

export default App;
