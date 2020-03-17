import React, { Component } from 'react';
import axios from 'axios';

const routeGenerator = require('./../shared/routeGenerator');

export default class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
        };
        
        let api_uri = routeGenerator.getURI("users/add");
        axios.post(api_uri, newUser).then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }


    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-secondary" />
                    </div>
                </form>
            </div>
        )
    }
}