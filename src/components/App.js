import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PageCollectionAdd from './PageCollectionAdd';
import PageCollectionEdit from './PageCollectionEdit';
import PageCollectionView from './PageCollectionView';
import PageError from './PageError';
import PageGallery from './PageGallery';
import PageImageAdd from './PageImageAdd';
import PageImageEdit from './PageImageEdit';
import PageImageView from './PageImageView';

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
          <div className="App">
			<Switch>
              <Route path='/' component={PageGallery} exact />
              <Route path='/collection/add' component={PageCollectionAdd} />
              <Route path='/collection/edit/:id' component={PageCollectionEdit} />
              <Route path='/collection/:id' component={PageCollectionView} />
              <Route path='/image/add' component={PageImageAdd} />
              <Route path='/image/edit/:id' component={PageImageEdit} />
              <Route path='/image/:id' component={PageImageView} />
              <Route component={PageError} />
            </Switch>
          </div>
		);
	}
}

export default App;
