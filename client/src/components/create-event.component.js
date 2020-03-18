import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const routeGenerator = require('./../shared/routeGenerator');

export default class CreateEvent extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            title: '',
            description: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        let eventDate = '';
        if (localStorage && localStorage.getItem('eventDate')) {
            eventDate = JSON.parse(localStorage.getItem('eventDate'));
        }
        this.setState({ date: new Date(eventDate) });
        
        let api_uri = routeGenerator.getURI("users");
        axios.get(api_uri)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }


    onSubmit(e) {
        e.preventDefault();
        
        const newEvent = {
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
        };

        let api_uri = routeGenerator.getURI("events/add");
        axios.post(api_uri, newEvent).then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Event</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Created by: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                showTimeSelect
                                dateFormat="Pp"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Event" className="btn btn-secondary" />
                    </div>
                </form>
            </div>
        )
    }
}