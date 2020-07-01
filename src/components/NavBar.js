import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class NavBar extends Component{

	constructor(props) {
		super(props);
	}

	render(){
		return(
          <div className="navbar">
            <Link className="navbar_link" to="/">Gallery</Link>
            <Link className="navbar_link" to="/collection/add">Create Collection</Link>
            <Link className="navbar_link" to="/image/upload">Upload an Image</Link>
          </div>
		);
	}
}

export default NavBar;
