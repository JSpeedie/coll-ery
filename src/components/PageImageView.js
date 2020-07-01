import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class PageImageView extends Component{

	constructor(props) {
		super(props);
		this.state = {
			img: {
				title: "title",
				author_name: "author",
				date_taken: "2020-01-01",
				description: "description",
			}
		}
	}

	render(){
		return(
           <div id="image_container">
             <div class="view_image_container">
               <div class="view_image_preview">
                 <img class="view_image_preview_image" src={"http://localhost:3000/api/img/" + this.props.match.params.id + "/"} />
                 <div class="view_image_info_div">
                   <div class="view_image_title">
                     {this.state.img.title}
                   </div>
                   <p class="view_image_info">
                     Author: {this.state.img.author_name}
                     <br />
                     Date taken: {this.state.img.date_taken}
                     <br />
                     <br />
                     {this.state.img.description}
                     <br />
                   </p>
                 </div>
               </div>
             </div>
           </div>
		);
	}

	componentDidMount() {
		fetch('http://localhost:3000/api/images/' + this.props.match.params.id)
			.then(res => res.json()).then((data) => {
				this.setState({ img: data })
			}).catch(console.log);
	}
}

export default PageImageView;
