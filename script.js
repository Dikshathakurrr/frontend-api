async function submitData() {
    const jsonInput = document.getElementById("jsonInput").value;
    const responseOutput = document.getElementById("responseOutput");
    
    try {
        // Parse JSON input
        const parsedData = JSON.parse(jsonInput);

        // Make API call to backend
        const response = await fetch("https://your-backend.herokuapp.com/bfhl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsedData)
        });

        const responseData = await response.json();
        
        // Get selected filter options
        const selectedFilters = Array.from(document.getElementById("filter").selectedOptions)
                                    .map(option => option.value);
        
        // Show only selected data
        let filteredResponse = {};
        selectedFilters.forEach(filter => {
            filteredResponse[filter] = responseData[filter];
        });

        responseOutput.textContent = JSON.stringify(filteredResponse, null, 2);
    } catch (error) {
        responseOutput.textContent = "Invalid JSON or API Error";
    }
}
