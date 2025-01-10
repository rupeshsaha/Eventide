import React, { useState, useEffect } from "react";
import { BriefcaseBusiness, Calendar1Icon, ChevronLeft, ChevronRight, Clock, Delete, Edit, Info, Tag, Trash, WorkflowIcon, X  } from "lucide-react";
import EventFormPopup from "./EventFormPopup";
import EventEditFormPopup from "./EventEditFormPopup";
import { deleteEvent, getAllEvents } from "../utils/LocalStorage";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Open Event Form Popup
  const handleEventFormOpen = (e, date) => {
    const isDateBox = e.target.className.includes("date-box");
    if (isDateBox) {
      setSelectedDate(date.toDateString());
      setIsEventFormOpen(true);
    }
  };

  // Close Event Form Popup
  const handleEventFormClose = () => {
    setIsEventFormOpen(false);
    setSelectedDate(null);
  };

  // Open Event list for a day
  const handleEventListOpen = (date) => {
    setIsEventListOpen(true);
    setSelectedDate(date.toDateString());
  };

  // Close Event list for a day
  const handleEventListClose = () => {
    setIsEventListOpen(false);
    setSelectedDate(null);
  };

  const handleEditOpen = (event) => {
    setSelectedEvent(event);
    setIsEditPopupOpen(true);
  };

  const handleEditClose = () => {
    setIsEditPopupOpen(false);
    setSelectedEvent(null);
  };

  // Generate the first and last day of the calendar grid
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const firstDayOfCalendar = new Date(
    firstDayOfMonth.setDate(
      firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
    )
  );

  const lastDayOfCalendar = new Date(
    lastDayOfMonth.setDate(
      lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())
    )
  );

  // Generate calendar dates for display
  const generateCalendarDates = () => {
    const dates = [];
    let current = new Date(firstDayOfCalendar);

    while (current <= lastDayOfCalendar) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const calendarDates = generateCalendarDates();

  // Navigate to the previous month
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Fetch all events whenever refreshed
  useEffect(() => {
    const allEvents = getAllEvents();
    setEvents(allEvents);
  }, [refresh]);

  return (
    <div className="w-full mx-auto md:p-8 p-2">
      {/* Header */}
      <div className="flex justify-evenly items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-lg p-2 rounded-full hover:bg-gray-300"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-lg p-2 rounded-full hover:bg-gray-300"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={day === "Sun" || day === "Sat" ? "text-red-500": ""}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="h-[88vh] grid grid-cols-7 md:gap-2 mt-2">
        {calendarDates.map((date) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const isWeekend = date.toDateString().includes(`Sat`) || date.toDateString().includes(`Sun`)
          const dateKey = date.toDateString();

          return (
            <div
              key={date}
              className={`date-box p-2 min-h-[6.5rem] flex flex-col gap-1 border-2 md:rounded-md cursor-pointer 
              ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"} 
              ${isToday ? "border-blue-500" : ""}`}
              onClick={(e) => {
                handleEventFormOpen(e, date);
              }}
            >
              <span
                className={`text-xs font-bold w-fit rounded-full  ${isToday ? "bg-blue-500 text-white p-[4px]" : ""} ${isWeekend && "text-red-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventListOpen(date);
                }}
              >
                {date.getDate()}
              </span>

              {/* Render Events */}
              {events
                .filter((event) => event.date === dateKey)
                .map((event, index, filteredEvents) => {
                  const extraEvents = filteredEvents.length - 3;

                  if (index < 2) {
                    return (
                      <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventListOpen(date);
                      }}
                        key={index}
                        className={`text-xs text-white rounded flex justify-start items-center p-1 truncate 
                          ${
                            event.category === "study"
                              ? "bg-green-300 hover:bg-green-500"
                              : event.category === "work"
                              ? "bg-blue-300 hover:bg-blue-500"
                              : "bg-red-300 hover:bg-red-500"
                          }`}
                      >
                        {event.title}
                      </div>
                    );
                  } else if (index === 2 && filteredEvents.length > 3) {
                    return (
                      <div key="see-more">
                        <button
                          className="text-xs rounded hover:bg-gray-400 hover:text-white flex justify-start items-center p-1 truncate "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventListOpen(date);
                          }}
                        >
                          See {extraEvents} more
                        </button>
                      </div>
                    );
                  }

                  return null;
                })}

              {/* Show Events for selected date  */}

              {isEventListOpen && selectedDate === dateKey && (
                <div className="fixed inset-0 flex justify-center items-center cursor-default bg-black bg-opacity-50 z-20  ">
                  <div className="bg-white shadow-lg rounded-lg px-2 w-11/12 max-w-md overflow-y-scroll max-h-[95vh] ">
                    <div className="flex justify-between items-center mb-6 bg-white sticky top-0">   
                        <h2 className="text-2xl font-semibold flex items-center gap-2 p-4">
                        <Calendar1Icon/>
                        {dateKey}                      
                      </h2>
                      <button
                        onClick={handleEventListClose}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-6 h-6" />
                      </button>
                      
                  

                    </div>
                    {events
                      .filter((event) => event.date === dateKey)
                      .map((eventDetails, idx) => (
                        <div
                          key={idx}
                          className="mb-4 p-4 flex justify-between  bg-gray-50 rounded-lg shadow-inner cursor-pointer "
                        >
                          <div>
                          <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
                            <BriefcaseBusiness className="w-5 h-5 text-blue-500" />
                            {eventDetails.title}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            {eventDetails.startTime} - {eventDetails.endTime}
                          </div>
                          {eventDetails.description && (<div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Info className="w-4 h-4 text-blue-500" />
                            {eventDetails.description}
                          </div>)}
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Tag className="w-4 h-4 text-blue-500" />
                            {eventDetails.category}
                          </div></div>
                          <div className="flex flex-col justify-between">
                            <button 
                            onClick={() => handleEditOpen(eventDetails)}
                              ><Edit/></button>
                            <button onClick={()=>{
                              deleteEvent(eventDetails.id) 
                              setRefresh((prev)=>!prev)}}><Trash color='red'/></button>
                            </div>
                        </div>
                      ))}
                
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Event Form Popup */}
      <EventFormPopup
        isOpen={isEventFormOpen}
        onClose={handleEventFormClose}
        setRefresh={setRefresh}
        selectedDate={selectedDate}
      />
            {isEditPopupOpen && (
        <EventEditFormPopup
          eventDetails={selectedEvent}
          onClose={handleEditClose}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default Calendar;
