import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// components
import Navbar from "./components/navbar.component"
import EventCalendar from "./components/event-calendar.component";
import EventList from "./components/event-list.component";
import CreateEvent from "./components/create-event.component";
import EditEvent from "./components/edit-event.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={EventCalendar} />
        <Route path="/event/list" exact component={EventList} />
        <Route path="/create/event" component={CreateEvent} />
        <Route path="/edit/event/:id" component={EditEvent} />
        <Route path="/create/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
