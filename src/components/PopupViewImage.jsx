import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoChevronLeft, GoChevronRight, GoPencil, GoX } from "react-icons/go";

class PopupViewImage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			image: {
				_id: "_id",
				title: "title",
				author_name: "author",
				date_taken: "2020-01-01",
				description: "description",
			},
			collection: {
				title: "title",
				description: "description",
				thumbnail_image_id: "thumbnail_image_id",
				images: [],
			},
			prevImageId: -1,
			nextImageId: -1
	}
	}

	renderViewPrevImage = () => {
		if (this.props.collectionId) {
			if (this.state.prevImageId !== -1) {
				return (
                  <a className="view_prev_image hide_link"
                       onClick={ () => {
						if (this.state.prevImageId !== -1) {
							this.loadPageInfo(this.state.prevImageId, this.state.collection._id)
						}
                  }}>
                    <GoChevronLeft />
                  </a>
				);
			} else {
				return (
                  <div className="view_prev_image hide_link"></div>
				);
			}
		}
	}

	renderViewNextImage = () => {
		if (this.props.collectionId) {
			if (this.state.nextImageId !== -1) {
				return (
                  <a className="view_next_image hide_link"
                       onClick={ () => {
						if (this.state.nextImageId !== -1) {
							this.loadPageInfo(this.state.nextImageId, this.state.collection._id)
						}
                  }}>
                    <GoChevronRight />
                  </a>
				);
			} else {
				return (
                  <div className="view_next_image hide_link"></div>
				);
			}
		}
	}


	render() {
		return(
           <div id="popup_image_section">
             <div className="popup_image_controls">
               <div className="popup_image_control"
                    onClick={ () => this.props.onExit(null) } >
                  <GoX />
               </div>
               <Link className="popup_image_control hide_link"
                     to={"/image/edit/" + this.state.image._id}>
                  <GoPencil />
               </Link>
             </div>
             {this.renderViewPrevImage()}
             <div id="image_container">
               <div className="view_image_container">
                 <div className="view_image_preview">
                   <img className="view_image_preview_image"
                        src={"http://localhost:3000/api/img/" + this.state.image._id + "/"} />
                   <div className="view_image_info_div">
                     <div className="view_image_title">
                       {this.state.image.title}
                     </div>
                     <p className="view_image_info">
                       Author: {this.state.image.author_name}
                       <br />
                       Date taken: {this.state.image.date_taken}
                     </p>
                     <p className="view_image_info_desc">
                       {this.state.image.description}
                       <br />
                     </p>
                   </div>
                 </div>
               </div>
             </div>
             {this.renderViewNextImage()}
           </div>
		);
	}

	loadPageInfo(imageId, collectionId) {
		fetch('http://localhost:3000/api/images/' + imageId)
			.then(res => res.json()).then((data) => {
				this.setState({ image: data }, () => {
					fetch('http://localhost:3000/api/collections/' + collectionId)
						.then(res => res.json()).then((data) => {
							this.setState({ collection: data }, () => {
								let nextId = -1;
								let prevId = -1;

								for (let i = 0; i < this.state.collection.images.length; i++) {
									if (this.state.collection.images[i] === this.state.image._id) {
										if (i - 1 >= 0) {
											prevId = this.state.collection.images[i - 1];
										}
										if (i + 1 < this.state.collection.images.length) {
											nextId = this.state.collection.images[i + 1];
										}
										break;
									}
								}

								this.setState({
									nextImageId: nextId,
									prevImageId: prevId
								});
							})
						}).catch(console.log);
				})
			}).catch(console.log);
	}

	componentDidMount() {
		this.loadPageInfo(this.props.imageId, this.props.collectionId);
	}
}

export default PopupViewImage;
