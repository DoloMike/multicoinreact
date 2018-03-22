import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { login } from '../utils/api'

class LoginForm extends Component {
    state = {
        loginFormOpen: true,
        currentPassword: '',
        errorText: '',
        redirect: false
    }

    handleChange = (event) => {
        const currentPassword = event.target.value
        this.setState({currentPassword, errorText: ''})
    }

    catchReturn = (e) => {e.key === 'Enter' && this.apiLogin()}

    apiLogin = () => {
        let pass = this.state.currentPassword
        login(pass).then(res => {
            if(res.status !== 200) {
                this.setState({currentPassword: '', errorText: 'wrong password'})
            } else {
                res.json().then(res => {
                    this.setState({redirect: true, jwt: res.jwt})   
                })
            }
        })
    }

    render() {
        const actions = [
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.apiLogin}
            />
            ];

        if(this.state.redirect) {
            const jwt = this.state.jwt
            return <Redirect to={{pathname: '/transaction', state: { jwt: jwt } }}/>
        }

        return (
            <div align="center">
                <Dialog
                    title="Enter the password"
                    actions={actions}
                    modal={false}
                    open={this.state.loginFormOpen}
                    >
                    <br />
                    <TextField
                        autoFocus
                        name="Password"
                        floatingLabelText='Password'
                        type='password'
                        onChange={this.handleChange}
                        value={this.state.currentPassword}
                        errorText={this.state.errorText}
                        onKeyPress={this.catchReturn}
                    />
                </Dialog>
            </div>
        )
    }
}

export default LoginForm;
