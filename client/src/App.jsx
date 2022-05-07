import "./App.scss";
import "bootswatch/dist/slate/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import FullCalendar, { formatDate } from "@fullcalendar/react";
import React, { useState } from "react";
import { addAppointment, deleteAppointment } from "./utils/eventUtils.js";

import Nav from "./components/Nav";
import Swal from "sweetalert2";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const App = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateSelect = (selectInfo) => {
    if (selectInfo.view.type === "dayGridMonth") {
      selectInfo.view.calendar.changeView("timeGridDay", selectInfo.startStr);
    } else {
      Swal.fire({
        title: "Enter an Email",
        html: `<input type="text" id="email" class="swal2-input" placeholder="Email">`,
        confirmButtonText: "Confirm Date",
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector("#email").value;
          let calendarApi = selectInfo.view.calendar;
          if (!title) {
            Swal.showValidationMessage(`Please enter your Email`);
          } else if (title) {
            calendarApi.addEvent({
              title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay,
            });

            addAppointment(title, selectInfo.startStr)
          }
        },
      }).then((result) => {
        if(result.isConfirmed === true) {
          Swal.fire(
            `
            Date confirmed for the ${selectInfo.start}
          `.trim()
          );
        }
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        clickInfo.event.remove();
        deleteAppointment(clickInfo.event.extendedProps._id);
      }
    });
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <div className="demo-app">
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>All Events ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map((evt) => (
              <li key={evt.start}>
                <b>
                  {formatDate(evt.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </b>
                <i>{evt.title}</i>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="demo-app-main">
        <Nav evt={currentEvents} />
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrap5Plugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          themeSystem="bootstrap5"
          initialView="dayGridMonth"
          slotDuration={"01:00"}
          allDaySlot={false}
          slotMinTime={"9:00:00"}
          slotMaxTime={"18:00:00"}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={false}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          events={"https://schedule-service-app.herokuapp.com/api/products"}
        />
      </div>
    </div>
  );
};

export default App;
