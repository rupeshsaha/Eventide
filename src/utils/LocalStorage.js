const createEvent = (title, date, startTime, endTime, description, category) => {
    try {
        const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

        const eventObject = {
            id: Date.now(), 
            title: title,
            date: date,
            startTime: startTime || "00:00",
            endTime: endTime || "23:59",
            description: description || "",
            category: category || "",
        };

        const updatedEvents = [...existingEvents, eventObject];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    } catch (error) {
        alert(`Error while adding event: ${error}`);
    }
};

const getAllEvents = () => {
    try {
        return JSON.parse(localStorage.getItem("events")) || [];
    } catch (error) {
        alert(`Error while reading events from local storage: ${error}`);
    }
};

const deleteEvent = (eventId) => {
    try {
        const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
        const updatedEvents = existingEvents.filter(event => event.id !== eventId);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    } catch (error) {
        alert(`Error while deleting event: ${error}`);
    }
};

const editEvent = (eventId, updatedData) => {
    try {
        const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
        const updatedEvents = existingEvents.map(event => {
            if (event.id === eventId) {
                return { ...event, ...updatedData }; // Merge updated data with existing event
            }
            return event;
        });
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    } catch (error) {
        alert(`Error while editing event: ${error}`);
    }
};

export { createEvent, getAllEvents, deleteEvent, editEvent };
