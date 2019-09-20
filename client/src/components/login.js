import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import authentication from '../services/authentication';

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
        if (authentication.currentUserValue) {
            this.props.history.push('/chat');
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        authentication.login(this.state.username,this.state.password)
            .then(
                () => {
                    const { from } = this.props.location.state || { from: { pathname: "/chat" } };
                    this.props.history.push(from);
                }
            );
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">Username</label>
                        <input type="username" id="email" className="FormField__Input" placeholder="Enter your username" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign In</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(login);