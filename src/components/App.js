import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PageGallery from './PageGallery';
import PageCollectionAdd from './PageCollectionAdd';
import PageImageView from './PageImageView';
import PageCollectionView from './PageCollectionView';
import PageError from './PageError';

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
              <Route path='/image/:id' component={PageImageView} />
              <Route path='/collection/:id' component={PageCollectionView} />
              <Route component={PageError} />
            </Switch>
          </div>
		);
	}
}

export default App;
