import React from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import signup from './components/signup';
import login from './components/login';
import api from './services/api';
import './App.css';
import authentication from './services/authentication';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentUser: null
        };
    }

    //runs after rendering
    async componentDidMount(){
        authentication.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }


    render(){
        const { currentUser } = this.state;
        return (
            <Router basename="/">
                {currentUser == null ?
                    <div className="App">
                        <div className="App__Form">
                            <div className="PageSwitcher">
                                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active"
                                         className="PageSwitcher__Item">Sign In</NavLink>
                                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active"
                                         className="PageSwitcher__Item">Sign Up</NavLink>
                            </div>

                            <div className="FormTitle">
                                <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active"
                                         className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/"
                                                                                                   activeClassName="FormTitle__Link--Active"
                                                                                                   className="FormTitle__Link">Sign
                                Up</NavLink>
                            </div>

                            <Route exact path="/" component={signup}>
                            </Route>
                            <Route path="/sign-in" component={login}>
                            </Route>
                        </div>
                        <div className="title_message App__Aside">
                            <img className="MyImage" src={require('./image.png')} alt="IMAawGE"></img>
                        </div>
                    </div>
                    :
                    <div>LoggedIn</div>
                }
            </Router>
        );
    }
}

export default App;