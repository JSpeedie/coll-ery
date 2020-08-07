import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PageCollectionAdd from './PageCollectionAdd.jsx';
import PageCollectionEdit from './PageCollectionEdit.jsx';
import PageCollectionView from './PageCollectionView.jsx';
import PageError from './PageError.jsx';
import PageGallery from './PageGallery.jsx';
import PageGalleryImages from './PageGalleryImages.jsx';
import PageGalleryCollections from './PageGalleryCollections.jsx';
import PageImageAdd from './PageImageAdd.jsx';
import PageImageEdit from './PageImageEdit.jsx';
import PageImageView from './PageImageView.jsx';
import PageSignin from './PageUserSignin.jsx';
import PageSignup from './PageUserSignup.jsx';

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
          <div className="App">
			<Switch>
              <Route path='/' component={PageGallery} exact />
              <Route path='/collections' component={PageGalleryCollections} exact />
              <Route path='/collection/add' component={PageCollectionAdd} />
              <Route path='/collection/edit/:id' component={PageCollectionEdit} />
              <Route path='/collection/:id' component={PageCollectionView} exact />
              <Route path='/images' component={PageGalleryImages} exact />
              <Route path='/image/add' component={PageImageAdd} />
              <Route path='/image/edit/:id' component={PageImageEdit} />
              <Route path='/image/:id' component={PageImageView} />
              <Route path='/collection/:collectionId/:id' component={PageImageView} exact />
              <Route path='/signin' component={PageSignin} />
              <Route path='/signup' component={PageSignup} exact />
              <Route component={PageError} />
            </Switch>
          </div>
		);
	}
}

export default App;
