import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, 
	Link
} from 'react-router-dom';


// CSS
import './assets/css/main.css';

//COMPONENTS
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/home/Home';
class App extends Component {
  render() {
    return (
    	<Router>
			<div className="App">
		  		<div className="container">
		  			<Header />

						<Route exact path='/' component={Home}></Route>

					<Footer />
		  		</div>
			</div>
		</Router>
    );
  }
}

export default App;
