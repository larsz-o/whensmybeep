import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {InputLabel, Input, Button, Typography} from '@material-ui/core';
import swal from 'sweetalert';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();
    event.preventDefault();
    if(this.passwordConfirmationAlert()){ 
    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  passwordConfirmationAlert = () => {
    if (this.state.password === this.state.confirm_password){
      return true;
    } else {
      swal('Oh no!', 'Entered passwords do not match! Try again.', 'warning');
      return false; 
    }
  }
  renderAlert() {
    if (this.state.message !== '') {
      return (
        <Typography variant="headline"
          className="alert"
          role="alert"
        >
          {this.state.message}
        </Typography>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div className="flex-box-form">
        {this.renderAlert()}
        <form>
          <Typography variant="headline">Create Account</Typography>
          <div>
            <InputLabel htmlFor="username"/>
              Username:
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div>
            <InputLabel htmlFor="password"/>
              Password:
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
           <br/>
            <InputLabel htmlFor="confirm-password"/>
              Confirm Password:
              <Input
                type="password"
                name="confirm-password"
                value={this.state.confirm_password}
                onChange={this.handleInputChangeFor('confirm_password')}
                required
              />
          </div>
          <div>
            <Button onClick={this.registerUser}>Submit</Button>
            <Link to="/home">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

