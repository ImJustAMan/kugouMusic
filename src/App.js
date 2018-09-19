import React, { Component } from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer/reducer'
import HomePageSearch from "./component/homepagesearch";

let obj = {
	playState: false,
	list: [],
	src: ''
};

let store = createStore(reducer,obj);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
		  <BrowserRouter>
			  <div className="App">
				  <HomePageSearch/>
			  </div>
		  </BrowserRouter>
	  </Provider>
    );
  }
}

export default App;
