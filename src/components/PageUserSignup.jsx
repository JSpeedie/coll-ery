import React, { Component } from 'react';

import NavBar from './NavBar.jsx';

class PageUserSignup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "username",
			password: "password",
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);

		this.signupFormSubmit = this.signupFormSubmit.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({ username: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	signupFormSubmit(e) {
		e.preventDefault();

		fetch("http://localhost:3000/api/users/", {
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			})
		}).then((response) => {
			if (response.status !== 200) {
				return;
			} else {
				// response.json().then((resp) => {
				// 	this.setState({
				// 	});
				// })
			}
		})
	}

	render() {
		return(
           <div className="UserSignup">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <form className="complex_form"
                   id="signup_form"
                   action="/api/users/"
                   method="POST" encType="multipart/form-data">
               <div className="form_title">Sign Up</div>
               <input type="text"
                      id="signup_username"
                      className="form_element"
                      placeholder="Username"
                      onChange={this.handleUsernameChange}
                      required />
               <input type="text"
                      id="signup_password"
                      className="form_element"
                      placeholder="password"
                      onChange={this.handlePasswordChange}
                      required />
               <button type="submit"
                       className="form_submit button form_button"
                       onClick={this.signupFormSubmit}>
                 Sign Up
               </button>
             </form>

             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
           </div>
		);
	}
}

export default PageUserSignup;
