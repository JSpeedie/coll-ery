import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../components/App.js';

import maincss from "../style/main.css";
import gallerycss from "../style/gallery.css";
import formcss from "../style/form.css";
import viewimagecss from "../style/viewimage.css";

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
	document.getElementById("root"));
