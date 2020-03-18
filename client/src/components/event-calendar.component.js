import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const routeGenerator = require('./../shared/routeGenerator');

export default class EventCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            redirect: null
        };
    }

    componentDidMount() {
        let api_uri = routeGenerator.getURI(`events`);
        axios.get(api_uri)
            .then(response => {
                this.setState({ events: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleDateClick = (arg) => {
        // alert(arg.dateStr)
        // <Link to={"/create/event"}></Link>
        localStorage.setItem('eventDate', JSON.stringify(arg.dateStr));
        this.setState({ redirect: `/create/event` });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={this.handleDateClick}
                events={this.state.events}
            />
        )
    }

}