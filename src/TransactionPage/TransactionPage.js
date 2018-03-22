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
    let transactionHolder = null;

    if (this.state.loading) {
      transactionHolder = <Loading />
    } else {
      transactionHolder = <div><TransactionCard encodedEthTran={this.state.encodedEthTran} /></div>
    }

    if (this.state.redirect) {
      return <Redirect to='/'/>;
    } else {
      return (
        <div align="center">
          {transactionHolder}
        </div>
      )
    }
  }
}

export default TransactionPage;
