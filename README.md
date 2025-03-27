# Weather Forecast Web Application

This is a web application that provides information about the weather for up to 3 days for any city.  
The application is hosted at PythonAnywhere and can be accessed at: [https://fredcs50.pythonanywhere.com/](https://fredcs50.pythonanywhere.com/)

## Files Breakdown

### `app.py`
Main application file that declares the filters for Jinja, renders the HTML templates properly with the correct parameters, and gets information from the API. In this project, the API used to get information about the weather and alerts was the WeatherAPI, available at [https://www.weatherapi.com/](https://www.weatherapi.com/), with the free plan.

### `helpers.py`
File that contains auxiliary functions that handle converting different date and time formats. `dt_time`, `dt_date`, and `dt_full` convert a full timestamp to simply the time in `hh:mm` format, the date in `dd/mm/yyyy` format, and the timestamp in `dd/mm/yyyy - hh:mm` format, respectively. The `convert_time` function converts a 12-hour time format into a 24-hour format.

### `requirements.txt`
A text file that contains dependencies for the project. In this case, only Flask and Requests were used, with Flask handling the backend and Requests handling the API requests. The dependencies in this file can be installed with the command: pip install -r requirements.txt

## Templates

### `layout.html`
HTML layout that was used as the base for other templates. It contains meta information, page title, icon, and the "Weather Forecast" header with a colored strip. It also sets the background color for the application.

### `index.html`
Main page HTML, containing the form to type the city name, with the submit button. The form is submitted to `/cities` using the GET method, so the user can see which city was searched. It also uses Jinja to conditionally show an error div in case anything goes wrong, for instance, if the city doesn't exist in the API's database.

### `weather.html`
HTML that contains all the information about the weather. It is split into a few segments, each containing some type of content. 

- The **main part** contains the current conditions, temperature, feels-like temperature, and the last updated time. These were considered the most important data, so they are presented prominently.
- To its side, there is information about the location, such as the name, region, country, timezone, and local time.
- Below, there is the rest of the current weather information, split across sections: humidity, pressure, UV, precipitation, and wind information, such as speed, direction, degree, and gust speed. This section finishes the area of current weather information.
- Below that, if there is any alert for the city, there's a section with alerts, colored according to their severity (red for severe, yellow otherwise). These alerts contain useful information, such as the event type, description, instructions, areas affected, severity, urgency, and certainty, along with a header summarizing the information.
- Then, there is information about air quality, starting with a table showing the concentration of common pollutants in the atmosphere, followed by two indexes that classify air quality: the US EPA Index and the GB DEFRA Index.
- Lastly, there is the **future information section**, which contains detailed information for the current day and the following two days. The user can select which day to get more detailed information about, and a new section will appear. This section includes maximum, minimum, and average temperatures, average wind speed, chance of rain, chance of snow, total precipitation, maximum wind speed, total snow, average humidity and visibility. It also contains astronomical information such as the moon phase and the exact times of sunrise, sunset, moonrise, and moonset.
- The last part of this section contains a table with complete hourly weather information.

## Static Files

### `favicon.ico`
A simple 256x256 icon that appears to the left of the page title. I chose an Earth icon because it made sense to me and I really liked that one.

### `cities.txt`
A text file containing the names of 115,882 cities, used for the autocomplete feature, there are cities that are not in the file, but the API has information about it.

### `style.css`
Even though Bootstrap was used to make development faster and simpler, a decent amount of CSS was applied to make the application look better. It was mainly used to adjust paddings and margins, or to change colors and text properties (size, font, alignment).

### `weather.js`
Simple JavaScript code that handles showing the complete weather information based on whether the user clicked a date and which date the user chose.

### `index.js`
JavaScript code that handles the search bar with autocomplete. Since the cities file is pretty big and the data is used to search for words with a prefix, a trie structure was perfect for the job. The first part of the code sets up a trie, then there is a function that loads the cities from the `cities.txt` file into the trie. Finally, there is code that controls whether or not the results dropdown is shown and which cities match the user’s input.
