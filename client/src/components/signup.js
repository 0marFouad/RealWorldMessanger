import React, { Component } from 'react';
import api from '../services/api';
import authentication from '../services/authentication';

class signup extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: ''
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
        e.preventDefault();
        authentication.signup(this.state.name,this.state.password,this.state.email).then(
            () => {
                const { from } = this.props.location.state || { from: { pathname: "/chat" } };
                this.props.history.push(from);
            }
        );
        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">Username</label>
                        <input type="text" id="name" className="FormField__Input" placeholder="Enter your username" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default signup;