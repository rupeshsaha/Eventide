const exportEvents = (month,year) => {
    // Retrieve the array from localStorage
    const arrayData = localStorage.getItem("events");
    
    // Convert it to a Blob
    const blob = new Blob([arrayData], { type: "application/json" });

    // Create a link element
    const a = document.createElement("a");

    // Set the download URL
    a.href = URL.createObjectURL(blob);

    // Set the filename
    a.download = "myArray.json";

    // Append the link to the body (not always necessary)
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Remove the link (cleanup)
    document.body.removeChild(a);
}

export {exportEvents};
