import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
// import moment from 'moment';

const routeGenerator = require('./../shared/routeGenerator');

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {
            username: '',
            title: '',
            description: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        let api_uri = routeGenerator.getURI("events/" + this.props.match.params.id);
        axios.get(api_uri)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    title: response.data.title,
                    description: response.data.description,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        api_uri = routeGenerator.getURI("users/");
        axios.get(api_uri)
            .then(response => {
                this.setState({ users: response.data.map(user => user.username) });
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

        const event = {
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
        };
        
        let api_uri = routeGenerator.getURI('events/update/' + this.props.match.params.id);
        axios.post(api_uri, event)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    deleteEvent(e) {
        e.preventDefault();

        let api_uri = routeGenerator.getURI("events/delete/" + this.props.match.params.id);
        axios.delete(api_uri)
            .then(response => { console.log(response.data) });

        window.location = '/';
    }
    
    render() {
        return (
            <div>
                <h3>Edit Event</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Created by: </label>
                        <select ref="userInput"
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
                        <input type="text"
                            required
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

                    <div className="form-inline">
                        <input type="submit" value="Edit Event" className="btn btn-primary" />
                    
                        <button className="btn btn-danger ml-1" onClick={this.deleteEvent}>Delete Event</button>
                    </div>
                </form>
            </div>
        )
    }
}