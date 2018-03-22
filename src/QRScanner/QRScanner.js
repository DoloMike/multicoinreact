import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
    scanDiv: {
      margin: '2em'
    },
    scanCam: {
      width: '100%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      maxWidth: '400px',
      transform: 'translate(-50%, -50%)',
    }
  }

class QRScanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      delay: 300,
      result: 'No result',
      showScan: false
    }

    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(data) {
    if(data) {
      this.setState({showScan: false})
      this.props.setEthEncodedEthTran(data)
    }
  }

  handleError = (err) => {
    console.error(err)
    this.setState({showScan: false})
  }

  toggleScanner = () => {
    this.setState({showScan: !this.state.showScan})
  }

  render() {
    return (
      <div style={styles.scanDiv}>
        <RaisedButton label="Toggle Scanner" primary={true} onClick={this.toggleScanner}/>    
        {
          this.state.showScan && 
          <QrReader
            style={styles.scanCam}
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            onLoad={this.handleLoad}
          />
        }
      </div>
    )
  }
}

export default QRScanner
