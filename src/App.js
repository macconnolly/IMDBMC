import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom' // react-router v4
import { ConnectedRouter } from 'connected-react-router'

import configureStore, { history } from './store/configureStore';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import Content from "./components/content/Content";
import SideBar from './components/sidebar/SideBar';


const store = configureStore();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
    }
    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

render(){
    return (



        <div className="App wrapper body">
            <Provider store={store}>
            <SideBar toggle={this.toggle} isOpen={this.state.isOpen}/>
            <Content toggle={this.toggle} isOpen={this.state.isOpen} />
            </Provider>

        </div>



    );
}
}
export default App;
