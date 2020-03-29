import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';
import io from 'socket.io-client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

// const routeGenerator = require('./../shared/routeGenerator');

export default class EventCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            redirect: null,
            connectionStatus: false,
            endpoint: 'http://127.0.0.1:6060'
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = io(endpoint);
        socket.on('events', data => {
            this.setState({ events: data });
        });
    }

    handleDateClick = (dateClickInfo) => {
        this.setState({ redirect: null });
        this.setState({ redirect: `/create/event?date=${dateClickInfo.dateStr}`});
    }

    handleEventClick = (eventClickInfo) => {
        this.setState({ redirect: null });
        this.setState({ redirect: `/edit/event/` + eventClickInfo.event.extendedProps._id });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='app-calendar'>
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin
                    ]}
                    events={this.state.events}
                    dateClick={this.handleDateClick}
                    eventClick={this.handleEventClick}
                />
            </div>
        )
    }

}
