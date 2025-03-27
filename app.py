import requests
import json
from flask import Flask, render_template, request, redirect
from helpers import dt_time, dt_date, dt_full, convert_time

app = Flask(__name__)

app.jinja_env.filters["dt_time"] = dt_time
app.jinja_env.filters["dt_date"] = dt_date
app.jinja_env.filters["dt_full"] = dt_full
app.jinja_env.filters["convert_time"] = convert_time

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/cities")
def cities():
    with open('static/config.json') as config_file:
        config = json.load(config_file)[0]

    city = request.args.get("city")
    if not city:
        return redirect("/")
    
    url = "http://api.weatherapi.com/v1/"
    key = "?key=" + config["key"]

    response = requests.get(url + "forecast.json" + key + "&q=" + city + "&aqi=yes&days=3")

    data = response.json()

    if response.status_code == 200:
        alerts = requests.get(url + "alerts.json" + key + "&q=" + city)

        if alerts.status_code == 200:
            return render_template("weather.html", location=data["location"], current=data["current"], air_quality=data["current"]["air_quality"], forecasts=data["forecast"]["forecastday"], alerts=alerts.json()["alerts"]["alert"])

        return render_template("weather.html", location=data["location"], current=data["current"], air_quality=data["current"]["air_quality"], forecasts=data["forecast"]["forecastday"])


    error = data["error"]
    message = f"Error {response.status_code}: {error.get('message', 'No information provided.')} Error code: {error.get('code', 'No error code provided.')}"
    return render_template("index.html", message=message)