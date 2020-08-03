import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import ImageGallery from './ImageGallery.jsx';
import NavBar from './NavBar.jsx';

class PageCollectionView extends Component{

	constructor(props) {
		super(props);
		this.state = {
			_id: "_id",
			title: "title"
		}

		this.deleteItem = this.deleteItem.bind(this);
	}

	deleteItem() {
		if (window.confirm("Are you sure you want to delete the collection, \"" + this.state.title + "\"?")) {
			const requestOptions = {
				method: 'DELETE'
			};

			fetch("http://localhost:3000/api/collections/" + this.state._id, requestOptions)
				.then((response) => {
					return response.json();
				}).catch(console.log);
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

             <div className="collection_view_controls">
               <Link className="gallery_item_title_control"
                     to={"/collection/edit/" + this.state._id}>
                 Edit
               </Link>
               <div className="gallery_item_title_control"
                    onClick={this.deleteItem}>
                 Delete
               </div>
             </div>

             <ImageGallery loadAll={true} collectionId={this.props.match.params.id}/>

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
				this.setState({
					_id: data._id,
					title: data.title
				});
			}).catch(console.log);
	}
}

export default PageCollectionView;
