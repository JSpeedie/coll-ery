import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import NavBar from './NavBar.jsx';

class PageError extends Component{

	constructor(props) {
		super(props);
	}

	render(){
		return(
	       <div className="Error">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <br/>
             <h2>There was an error. Please enter a valid url</h2>
             <br/>
           </div>
		);
	}
}

export default PageError;
