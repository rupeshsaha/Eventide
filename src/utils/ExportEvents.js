const exportEvents = (dateString) => {
    // Parse the input date string
    const inputDate = new Date(dateString);
    const month = inputDate.getMonth(); // 0-indexed (0 = January, 11 = December)
    const year = inputDate.getFullYear();

    // Retrieve the array from localStorage
    const arrayData = JSON.parse(localStorage.getItem("events"));

    // Filter the array based on month and year
    const filteredData = arrayData.filter(event => {
        const eventDate = new Date(event.date); // Assuming each object has a 'date' property
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    // Convert the filtered data to a Blob
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: "application/json" });

    // Create a link element
    const a = document.createElement("a");

    // Set the download URL
    a.href = URL.createObjectURL(blob);

    // Set the filename
    a.download = `filtered-events-${month + 1}-${year}.json`;

    // Append the link to the body (not always necessary)
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Remove the link (cleanup)
    document.body.removeChild(a);
};

export { exportEvents };
