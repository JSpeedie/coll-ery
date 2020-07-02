import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import ImageGallery from './ImageGallery';
import NavBar from './NavBar';

class PageCollectionView extends Component{

	constructor(props) {
		super(props);
		this.state = {
			title: "title"
		}
	}

	render(){
		return(
	       <div className="CollectionView">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <br/>
             <h2>{this.state.title}</h2>
             <br/>

             <ImageGallery collectionId={this.props.match.params.id}/>

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

	componentDidMount() {
		/* Get the title of the collection */
		fetch('http://localhost:3000/api/collections/' + this.props.match.params.id)
			.then(res => res.json()).then((data) => {
				this.setState({ title: data.title });
			}).catch(console.log);
	}
}

export default PageCollectionView;
