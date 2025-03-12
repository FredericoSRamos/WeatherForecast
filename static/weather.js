function showForecast(element) {
    let index = element.getAttribute("data-forecast-index");

    const allForecasts = document.querySelectorAll(".forecast-details");
    allForecasts.forEach((forecast) => {
        forecast.style.display = "none";
    });
    
    const selectedForecast = document.getElementById("forecast-" + index);
    selectedForecast.style.display = "block";
}