import React, { useState, useEffect } from "react";
import { createEvent } from "../utils/LocalStorage";

const EventFormPopup = ({ isOpen, onClose, setRefresh, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    category: ""
  });

  // default formdata 
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA").split("T")[0];
      setFormData((prev) => ({ ...prev, title: "", date: formattedDate, startTime: "00:00", endTime: "23:59", description: "", category: "" }));
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the date
    const formattedData = {
      ...formData,
      date: new Date(formData.date).toDateString(),
    };

    console.log("Event Data Submitted:", formattedData);

    // Call the createEvent function
    createEvent(
      formattedData.title,
      formattedData.date,
      formattedData.startTime,
      formattedData.endTime,
      formattedData.description,
      formattedData.category
    );

    // Refresh parent component
    setRefresh((prev) => !prev);


    // Close the popup
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-2">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter event title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Category
            </label>
            <div className="space-y-2">
              {["Work", "Personal", "Study"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="category"
                    value={option.toLowerCase()}
                    checked={formData.category === option.toLowerCase()}
                    onChange={handleChange}
                    className="form-radio text-blue-500 focus:ring-blue-500"
                    required
                  />
                  <span className="text-gray-600">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Enter event description"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition shadow-md"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormPopup;
