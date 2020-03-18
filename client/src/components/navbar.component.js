import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Event Calendar</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/event/list" className="nav-link">Events</Link>
                        </li>
                        {/* <li className="navbar-item">
                            <Link to="/event/calendar" className="nav-link">Calendar</Link>
                        </li> */}
                        {/* <li className="navbar-item">
                            <Link to="/create/event" className="nav-link">Create Event</Link>
                        </li> */}
                        <li className="navbar-item">
                            <Link to="/create/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}