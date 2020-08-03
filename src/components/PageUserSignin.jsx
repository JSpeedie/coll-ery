import React, { Component } from 'react';

import NavBar from './NavBar.jsx';

class PageUserSignin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "username",
			password: "password",
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);

		this.signinFormSubmit = this.signinFormSubmit.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({ username: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	signinFormSubmit(e) {
		e.preventDefault();

		fetch("http://localhost:3000/api/users/signin", {
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
           <div className="UserSignin">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <form className="complex_form"
                   id="signin_form"
                   action="/api/users/"
                   method="POST" encType="multipart/form-data">
               <div className="form_title">Sign In</div>
               <input type="text"
                      id="signin_username"
                      className="form_element"
                      placeholder="Username"
                      onChange={this.handleUsernameChange}
                      required />
               <input type="text"
                      id="signin_password"
                      className="form_element"
                      placeholder="password"
                      onChange={this.handlePasswordChange}
                      required />
               <button type="submit"
                       className="form_submit button form_button"
                       onClick={this.signinFormSubmit}>
                 Sign In
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

export default PageUserSignin;
