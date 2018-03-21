import React, { Component } from 'react';
import { Redirect } from 'react-router'
import TransactionCard from './TransactionCard'
import Loading from './Loading'
import { getEncodedEthTran } from '../utils/api'

class TransactionPage extends Component {
  state = {
    loading: true,
    redirect: false,
    encodedEthTran: ''
  }

  componentDidMount() {
    const jwt = this.props.location.state.jwt
    this.apiGetEthTran(jwt)
  }

  apiGetEthTran = (jwt) => {
    getEncodedEthTran(jwt)
      .then(res => {
        if(res.status === 401) {
          this.setState({
            redirect: true
          })
        } else {
          res.json().then(res => {
            this.setState({
              loading: false,
              encodedEthTran: res.encodedEthTran
            }) 
          })
        }
      })
  }

  render() {
    let renderComponent = null;

    if (this.state.loading) {
      renderComponent = <Loading />
    } else {
      renderComponent = <TransactionCard encodedEthTran={this.state.encodedEthTran} />
    }

    if (this.state.redirect) {
      return <Redirect to='/'/>;
    } else {
      return (
        <div align="center">
          {renderComponent}
        </div>
      )
    }
  }
}

export default TransactionPage;
