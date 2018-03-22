import React, { Component } from 'react';
import { Wallet } from 'ethers';
import hex2a from '../utils/hexToAscii';
import QRScanner from '../QRScanner/QRScanner'

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import {blue500, greenA200} from 'material-ui/styles/colors';

const styles = {
  span: {
    width: '6em',
    height: '2em',
    display: 'inline-block',
    color: '#9eccfe',
    fontWeight: 'bold'
  },
  spanNoWidth: {
    color: '#9eccfe',
    fontWeight: 'bold'
  },
  paper: {
    display: 'inline-block'
  },
  marginLeft: {
    marginLeft: '1em'
  },
  center: {
    display: 'inline-block',
    textAlign: 'left',
    maxWidth: '96vw',
    marginLeft: '-2vw'
  },
  divider: {
    margin: '2em'
  },
  error: {
    margin: '2em'
  }
}

class TransactionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickNameFormOpen: false,
      nickNames: new Map(),
      currAddress: '',  
      currNickName: '',
       ...props
    }
  }

  catchReturn = (e) => {e.key === 'Enter' && this.addNickName()}

  openNickNameForm = (addr) => this.setState({ nickNameFormOpen: true, currAddress: addr})
  
  closeNickNameForm = () => this.setState(() => ({ nickNameFormOpen: false, currAddress: '' }))

  addNickName = () => {
    let nickNames = this.state.nickNames
    nickNames.set(this.state.currAddress, this.state.currNickName)
    this.setState(nickNames)
    this.closeNickNameForm()
  }

  getNickName = (addr) => {
    let nickNames = this.state.nickNames
    return nickNames.has(addr) ? nickNames.get(addr) : ''
  }

  handleChange = (event) => {
    const currNickName = event.target.value
    this.setState({currNickName})
  }

  setEthEncodedEthTran = (encodedEthTran) => {
    this.setState({encodedEthTran})
  }

  render() {
    let tran

    try {
      tran = Wallet.parseTransaction(this.state.encodedEthTran);
    }
    catch(error) {
      return (
        <div style={styles.center}>
          <Paper style={styles.error} zDepth={5}>
            <CardText>That Doesn't Look Like an Ethereum Transaction!</CardText>
          </Paper>
          <div align='center'>
            <QRScanner setEthEncodedEthTran={this.setEthEncodedEthTran}/>
          </div>
        </div>
      )
    }

    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.addNickName}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.closeNickNameForm}
      />,
    ];

    return (
      <div style={styles.center}>
        <Paper style={styles.paper} zDepth={5}>
          <Card style={styles.cardMargin}>
            <CardTitle title={"Ethereum Transaction"} subtitle={"Overview"}/>

            <Divider />

            <CardText>
              <span style={styles.spanNoWidth}>To: <a className="nickNameAnchor" onClick={(e) => this.openNickNameForm(tran.to, e)}>{this.getNickName(tran.to)}</a></span>
              <p className='longText'>{tran.to}
                <BorderColor style={styles.marginLeft} color={blue500} hoverColor={greenA200} onClick={(e) => this.openNickNameForm(tran.to, e)}/>
              </p>
              <br />
              <span style={styles.spanNoWidth}>From: <a className="nickNameAnchor" onClick={(e) => this.openNickNameForm(tran.from, e)}>{this.getNickName(tran.from)}</a></span>
              <p className='longText'>{tran.from}
                <BorderColor style={styles.marginLeft} color={blue500} hoverColor={greenA200} onClick={(e) => this.openNickNameForm(tran.from, e)}/>
              </p>
            </CardText>

            <CardText>
              <span style={styles.span}>Value:</span>{tran.value.toNumber()} wei
              <br />
              <span style={styles.span}>Gas Limit:</span>{tran.gasLimit.toNumber()} wei
              <br />
              <span style={styles.span}>Gas Price:</span>{tran.gasPrice.toNumber()} wei
            </CardText>

            <CardText>
              <span style={styles.span}>Chain ID:</span>{tran.chainId}
              <br />
              <span style={styles.span}>Nonce:</span>{tran.nonce}
              <br />
              <span style={styles.span}>Data:</span>{hex2a(tran.data.substr(2))}
            </CardText>

            <CardText>
              <span style={styles.span}>V:</span><span>{tran.v}</span>
              <br />
              <span style={styles.span}>R:</span><p className='longText'>{tran.r}</p>
              <br />
              <span style={styles.span}>S:</span><p className='longText'>{tran.s}</p>
            </CardText>
          </Card>
        </Paper>

        <Dialog
          title="Enter a nickname for this address"
          actions={actions}
          modal={false}
          open={this.state.nickNameFormOpen}
          onRequestClose={this.closeNickNameForm}
          >
            {this.state.currAddress}
            <br />
            <TextField
              autoFocus
              name="Nickname"
              hintText="Nickname"
              floatingLabelText={this.getNickName(this.state.currAddress)}
              onChange={this.handleChange}
              onKeyPress={this.catchReturn}
            />
        </Dialog>

        <div align='center'>
          <QRScanner setEthEncodedEthTran={this.setEthEncodedEthTran}/>
        </div>
      </div>
    )
  }
}

export default TransactionCard
