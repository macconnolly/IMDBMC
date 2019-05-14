import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import NavBar from './Navbar';
import {history} from "../../store/configureStore";
import {Route, Router, Switch} from "react-router";
import MovieOverview from "../../container/movieOverview";
import LoginPage from "../loginPage";
import RegisterPage from "../registerPage";
import CleanerDetail from '../cleanerDetail';
import CreateMovieContainer from "../../container/createMovieContainer";
import {ConnectedRouter} from "connected-react-router";
class Content extends React.Component {

    render() {
        return (
            <Container fluid className={classNames('content', {'is-open': this.props.isOpen})}>
                <NavBar toggle={this.props.toggle}/>
                <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
                    <Router history={history}>
                        <Switch >
                            <Route path='/' exact component={MovieOverview} />
                            <Route path='/login' component={LoginPage} />
                            <Route path='/register' component={RegisterPage} />
                            <Route path="/properties" component={MovieOverview} />
                            <Route path='/property/create' exact component={CreateMovieContainer}/>
                            <Route path='/test/:id' exact component={RegisterPage} />
                            <Route path='/cleaner' exact component={CleanerDetail} />
                        </Switch>
                    </Router>
                </ConnectedRouter>
            </Container>
        );
    }
}

export default Content;
