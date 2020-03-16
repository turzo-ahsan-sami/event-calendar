import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Event = props => (
    <tr>
        <td>{props.event.username}</td>
        <td>{props.event.title}</td>
        <td>{props.event.description}</td>
        <td>{props.event.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/event/" + props.event._id}>edit</Link> | <a href="#" onClick={() => { props.deleteEvent(props.event._id) }}>delete</a>
        </td>
    </tr>
)


export default class EventCalendar extends Component {

    constructor(props) {
        super(props);
        this.deleteEvent = this.deleteEvent.bind(this);
        //this.updateEvent = this.updateEvent.bind(this);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:6060/events/')
            .then(response => {
                this.setState({ events: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    eventList() {
        return this.state.events.map(currentEvent => {
            return <Event event={currentEvent} deleteEvent={this.deleteEvent} key={currentEvent._id} />;
        })
    }

    deleteEvent(id) {
        axios.delete('http://localhost:6060/events/delete/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            events: this.state.events.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
                <h3>Events</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Added By</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.eventList()}
                    </tbody>
                </table>
            </div>
        )
    }
}